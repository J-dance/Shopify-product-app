import React from 'react'
import { QUERY_PRODUCTS } from '../../graphql/queries';
import { useQuery } from 'react-apollo';
import MyResourceList from '../MyResourceList/MyResourceList';
import MyLoadingComponent from '../MyLoadingComponent';

const PopulateResourcList = (props) => {
  const { productIds } = props;
  const { data, loading, error } = useQuery(QUERY_PRODUCTS(productIds))
  data && console.log(data);
  error && console.log(error);

  if(loading) return <MyLoadingComponent />

  return (
    <MyResourceList products={data?.products?.edges} emptyStateMarkup={undefined} isCompleted={true} />
  )
}

export default PopulateResourcList