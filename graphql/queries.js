import { gql } from 'apollo-boost';

export const GET_SHOP = gql`
  {
    shop {
      name
      id
      contactEmail
      primaryDomain {
        id
        host
        url
      }
      url
      myshopifyDomain
      plan {
        displayName
      }
      metafields(first: 100) {
        edges {
          node {
            namespace
            id
            value
            key
          }
        }
      }
      privateMetafields(first: 10) {
        edges {
          node {
            namespace
            id
            key
            value
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_METAFIELD = gql`
  query ProductMetafield($namespace: String!, $key: String!, $ownerId: ID!) {
    product(id: $ownerId) {
      metafield(namespace: $namespace, key: $key) {
        value
        key
      }
    }
  }
`
// {
//   "namespace": "my_fields",
//   "key": "liner_material",
//   "ownerId": "gid://shopify/Product/108828309"
// }

export const QUERY_PRODUCTS = (products) => {
  let query = '';

  products.forEach((product, index) => {
    if (index === 0) {
      query = query.concat(`title:'${product.title}'`)
    } else {
      query = query.concat(` OR title:'${product.title}'`)
    }
  });

  return gql`
    {
      products(first: 20, query: "${query}" ) {
        edges {
          node {
            title
            id
            featuredImage {
              id
              altText
              url
            }
          }
        }
      }
    }
  `
};

export const GET_PRODUCTS = (productIds) => {
  // construct query
  let query = {};
  productIds.forEach((productId, index) => {
    query[`product${index+1}`] = `product(id: "${productId}") {
      title
      id
      images {
        altText
        id
        url
      }
    }`
  });

  return 1
}