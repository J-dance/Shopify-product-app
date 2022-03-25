import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import { getFirstPublishedProduct, createClient, containsAppBlock } from './utilities';
import RedisStore from './handlers/CustomSessionStorage';

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

// Create a new instance of the custom storage class
const sessionStorage = new RedisStore();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  API_VERSION: ApiVersion.October21,
  IS_EMBEDDED_APP: true,
  // Pass the sessionStorage methods to pass into a new instance of `CustomSessionStorage`
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    sessionStorage.storeCallback.bind(sessionStorage),
    sessionStorage.loadCallback.bind(sessionStorage),
    sessionStorage.deleteCallback.bind(sessionStorage),
  ),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
console.log('hello there');

Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/webhooks",
  webhookHandler: async (topic, shop, body) =>
    delete ACTIVE_SHOPIFY_SHOPS[shop],
});

// using customer koa server and router
app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        const responses = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
        });

        if (!responses["APP_UNINSTALLED"].success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${responses.result}`
          );
        }

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  /**
   * This REST endpoint is resposible for returning whether the store's current main theme supports app blocks.
   */
   router.get(
    "/api/store/themes/main",
    verifyRequest({ authRoute: "/online/auth" }),
    async (ctx) => {
      const session = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
      const clients = {
        rest: new Shopify.Clients.Rest(session.shop, session.accessToken),
        graphQL: createClient(session.shop, session.accessToken),
      };

      // Check if App Blocks are supported
      // -----------------------------------

      // Specify the name of the template we want our app to integrate with
      const APP_BLOCK_TEMPLATES = ["product"];

      // Use `client.get` to request list of themes on store
      const {
        body: { themes },
      } = await clients.rest.get({
        path: "themes",
      });

      // Find the published theme
      const publishedTheme = themes.find((theme) => theme.role === "main");

      // Get list of assets contained within the published theme
      const {
        body: { assets },
      } = await clients.rest.get({
        path: `themes/${publishedTheme.id}/assets`,
      });

      // Check if template JSON files exist for the template specified in APP_BLOCK_TEMPLATES
      const templateJSONFiles = assets.filter((file) => {
        return APP_BLOCK_TEMPLATES.some(
          (template) => file.key === `templates/${template}.json`
        );
      });

      // Get bodies of template JSONs
      const templateJSONAssetContents = await Promise.all(
        templateJSONFiles.map(async (file) => {
          const {
            body: { asset },
          } = await clients.rest.get({
            path: `themes/${publishedTheme.id}/assets`,
            query: { "asset[key]": file.key },
          });

          return asset;
        })
      );

      // Find what section is set as 'main' for each template JSON's body
      const templateMainSections = templateJSONAssetContents
        .map((asset, index) => {
          const json = JSON.parse(asset.value);
          const main = json.sections.main && json.sections.main.type;

          return assets.find((file) => file.key === `sections/${main}.liquid`);
        })
        .filter((value) => value);

      // Request the content of each section and check if it has a schema that contains a
      // block of type '@app'
      const sectionsWithAppBlock = (
        await Promise.all(
          templateMainSections.map(async (file, index) => {
            let acceptsAppBlock = false;
            const {
              body: { asset },
            } = await clients.rest.get({
              path: `themes/${publishedTheme.id}/assets`,
              query: { "asset[key]": file.key },
            });

            const match = asset.value.match(
              /\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m
            );
            const schema = JSON.parse(match[1]);

            if (schema && schema.blocks) {
              acceptsAppBlock = schema.blocks.some((b) => b.type === "@app");
            }

            return acceptsAppBlock ? file : null;
          })
        )
      ).filter((value) => value);

      /**
       * Fetch one published product that's later used to build the editor preview url
       */
      const product = await getFirstPublishedProduct(clients.graphQL);
      const editorUrl = `https://${session.shop}/admin/themes/${
        publishedTheme.id
      }/editor?previewPath=${encodeURIComponent(
        `/products/${product?.handle}`
      )}`;

      /**
       * This is where we check if the theme supports apps blocks.
       * To do so, we check if the main-product section supports blocks of type @app
       */
      const supportsSe = templateJSONFiles.length > 0;
      const supportsAppBlocks = supportsSe && sectionsWithAppBlock.length > 0;
      
      if (templateJSONFiles.length === sectionsWithAppBlock.length) {
        console.log('All desired templates have main sections that support app blocks!');
      } else if (sectionsWithAppBlock.length) {
        console.log('Only some of the desired templates support app blocks.');
      } else {
        console.log("None of the desired templates support app blocks");
      };

      ctx.body = {
        theme: publishedTheme,
        supportsSe,
        supportsAppBlocks,
        /**
         * Check if each of the sample app's app blocks have been added to the product.json template
         */
        containsBpsBlock: containsAppBlock(
          templateJSONAssetContents[0]?.value,
          "bps",
          process.env.THEME_APP_EXTENSION_UUID
        ),
        editorUrl,
      };
      ctx.res.statusCode = 200;
    }
  )

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    // app code in here?
    const shop = ctx.query.shop;

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      console.log('authenticating..')
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});