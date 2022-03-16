import { gql } from 'apollo-boost';

export const GET_SHOP = gql`
  {
    shop {
      name
      id
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