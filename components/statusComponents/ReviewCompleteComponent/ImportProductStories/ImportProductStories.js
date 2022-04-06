import { useState, useEffect, useCallback, useContext } from 'react';
import { ShopDataContext } from '../../../../assets/context';
import { addURLParams } from '../../../../graphql/APICalls'
// component fetches product data from back end and mutates shop metefields
const ImportProductStories = () => {
  const [productData, setProductData] = useState();
  const shopData = useContext(ShopDataContext);

  // 1. fetch product data
  const fetchResponse = useCallback(async() => {
    const myHeaders = new Headers();
    const products = shopData?.data?.products;
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    products.forEach((product) => {
      const params = {
        id: product.id
      };
      const url = addURLParams(`${process.env.NEXT_PUBLIC_API_URL}/products?`, params);

      fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => console.log(JSON.parse(result)))
      .catch(error => console.log('error', error));
    })
  }, [shopData])

  useEffect(() => {
    fetchResponse();
  }, [fetchResponse]);

  return (
    <div>ImportProductStories</div>
  )
}

export default ImportProductStories