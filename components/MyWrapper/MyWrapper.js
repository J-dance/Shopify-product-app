import React from 'react';
import { useQuery } from "react-apollo";
import { GET_SHOP } from '../../graphql/queries';
import { Frame, Loading } from '@shopify/polaris';
import { ShopContext } from '../../assets/context';

const MyWrapper = (props) => {
  const { children } = props;
  
  // get shop details
  const { data, loading, error} = useQuery(GET_SHOP)
  if (loading) return <Frame><Loading /></Frame>;
  if (error) return `Error! ${error.message}`;
  // data && console.log(data.shop);

  return (
    <ShopContext.Provider value={data?.shop}>
      { children }
    </ShopContext.Provider>
  )
}

export default MyWrapper