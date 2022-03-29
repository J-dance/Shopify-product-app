const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const securityHeaders = [ 
  { 
    key: "Content-Security-Policy",
    value: `frame-ancestors https://${process.env.SHOP} https://admin.shopify.com`
  },
];

module.exports = {
  webpack: (config) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    return config;
  },
};

export async function headers() {
  return [
    {
      // Apply these headers to all routes in your application.
      source: '/:path*',
      headers: securityHeaders,
    },
  ];
}
