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