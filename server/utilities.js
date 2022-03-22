import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

export const GET_FIRST_PUBLISHED_PRODUCT_QUERY = gql`
  query GetFirstPublishedProduct {
    products(first: 1, query: "published_status:published") {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`;

const getNodesFromConnections = (connections) => {
  if (!connections) return [];
  return connections.edges.map(({ node }) => node);
};

export const getFirstPublishedProduct = (client) => {
  return client
    .query({ query: GET_FIRST_PUBLISHED_PRODUCT_QUERY })
    .then((response) => {
      return getNodesFromConnections(response.data.products)?.[0];
    });
};

export const createClient = (shop, accessToken) => {
  return new ApolloClient({
    uri: `https://${shop}/admin/api/2019-10/graphql.json`,
    request: (operation) => {
      operation.setContext({
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "User-Agent": `shopify-app-node ${process.env.npm_package_version} | Shopify App CLI`,
        },
      });
    },
  });
};

/**
 * Check if an specific app block wsa added to a template file.
 */
export const containsAppBlock = (
  templateJSONAssetContent,
  appBlockName,
  themeAppExtensionUuid
) => {
  const regExp = new RegExp(
    `shopify:\/\/apps\/.*\/blocks\/${appBlockName}\/${themeAppExtensionUuid}`
  );

  let parsedContent = undefined;

  try {
    parsedContent = JSON.parse(templateJSONAssetContent);
  } catch (err) {
    console.error(err);
  }

  /**
   * Retrieves all blocks belonging to template sections
   */
  const sections = Object.values(parsedContent?.sections || {});
  const blocks = sections
    .map(({ blocks = {} }) => Object.values(blocks))
    .flat();

  return blocks.some((block) => regExp.test(block.type));
};