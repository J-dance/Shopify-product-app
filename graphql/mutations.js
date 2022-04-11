import { gql } from "apollo-boost";

export const PRODUCT_UPDATE = gql`
  mutation {
    productUpdate(input: {id: "gid://shopify/Product/108828309", title: "Sweet new product - GraphQL Edition"}) {
      product {
        id
      }
    }
  }
`
// -----------------------------
export const SET_METAFIELDS = gql`
  mutation metafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`
// {
//   "metafields": [
//     {
//       "key": "materials",
//       "namespace": "my_fields",
//       "ownerId": "gid://shopify/Product/20995642",
//       "type": "multi_line_text_field",
//       "value": "95% Cotton\n5% Spandex"
//     },
//     {
//       "key": "manufactured",
//       "namespace": "my_fields",
//       "ownerId": "gid://shopify/Product/20995642",
//       "type": "single_line_text_field",
//       "value": "Made in Canada"
//     }
//   ]
// }

// -----------------------------
export const CREATE_PRIVATE_METAFIELD = gql`
  mutation privateMetafieldUpsert($input: PrivateMetafieldInput!) {
    privateMetafieldUpsert(input: $input) {
      privateMetafield {
        id
        namespace
        key
        value
        valueType
      }
      userErrors {
        field
        message
      }
    }
  }
`
// example input
// {
//   "input": {
//     "owner": "gid://shopify/Product/20995642",
//     "namespace": "wholesale",
//     "key": "price",
//     "valueInput": {
//       "value": "5.00",
//       "valueType": "FLOAT"
//     }
//   }
// }

// -----------------------------

export const CREATE_METAFIELD_DEFINITION = gql`
  mutation CreateMetafieldDefinition($definition: MetafieldDefinitionInput!) {
    metafieldDefinitionCreate(definition: $definition) {
      createdDefinition {
        id
        name
      }
      userErrors {
        field
        message
        code
      }
    }
  }
`

export const DELETE_PRIVATE_METAFIELD = gql`
  mutation privateMetafieldDelete($input: PrivateMetafieldDeleteInput!) {
    privateMetafieldDelete(input: $input) {
      deletedPrivateMetafieldId
      userErrors {
        field
        message
      }
    }
  }
`