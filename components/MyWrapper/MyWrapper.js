import React from 'react';
import { useQuery } from "react-apollo";
import { GET_SHOP } from '../../graphql/queries';
import { Frame, Loading } from '@shopify/polaris';
import { ShopContext } from '../../assets/context';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const MyWrapper = (props) => {
  const { children } = props;

  // Create a client
  const queryClient = new QueryClient()
  
  // get shop details
  const { data, loading, error} = useQuery(GET_SHOP)
  if (loading) return <Frame><Loading /></Frame>;
  if (error) return `Error! ${error.message}`;
  // data && console.log(data.shop);

  return (
    <ShopContext.Provider value={data?.shop}>
      <QueryClientProvider client={queryClient}>
        { children }
      </QueryClientProvider>
    </ShopContext.Provider>
  )
}

export default MyWrapper