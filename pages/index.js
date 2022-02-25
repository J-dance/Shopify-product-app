import { Heading, Page } from "@shopify/polaris";
import { gql } from 'apollo-boost';
import { useQuery } from "react-apollo";
export default function Index() {
  
  const GET_PRODUCTS = gql`
    {
      shop {
        name
        currencyCode
        checkoutApiSupported
        taxesIncluded
      }
    }
  `;
  

  const { data, loading, error} = useQuery(GET_PRODUCTS)
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  data && console.log(data)
  return (
    <Page>
      <Heading>
        Shopify app with Node and React{" "}
        <span role="img" aria-label="tada emoji">
          🎉
        </span>
      </Heading>
    </Page>
  );
}
