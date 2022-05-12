# Shopify App Node

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE.md)
[![Build Status](https://travis-ci.com/Shopify/shopify-app-node.svg?branch=master)](https://travis-ci.com/Shopify/shopify-app-node)

Boilerplate to create an embedded Shopify app made with Node, [Next.js](https://nextjs.org/), [Shopify-koa-auth](https://github.com/Shopify/quilt/tree/master/packages/koa-shopify-auth), [Polaris](https://github.com/Shopify/polaris-react), and [App Bridge React](https://shopify.dev/tools/app-bridge/react-components).

## Project Details

- Shopify embedded app with a theme extension block.
- Built to enhance product descriptions with a dynamic block component on the product pages.
- Manage the extension through the emdedded app in the Shopify admin portal.
- app uses Shopify grapgQL API's to access store data and save changes to the store.
- Built using Shopify CLI create node app with Next.js frame work and Koa server.

## Installation

Using the [Shopify CLI](https://github.com/Shopify/shopify-cli) run:

```sh
~/ $ shopify app create node -n APP_NAME
```

Or, fork and clone repo

## Requirements

- If you don’t have one, [create a Shopify partner account](https://partners.shopify.com/signup).
- If you don’t have one, [create a Development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) where you can install and test your app.
- In the Partner dashboard, [create a new app](https://help.shopify.com/en/api/tools/partner-dashboard/your-apps#create-a-new-app). You’ll need this app’s API credentials during the setup process.

