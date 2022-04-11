import { useState, useCallback } from 'react';
import { ShopDataContext } from '../../assets/context';
import { GET_SHOP } from '../../graphql/queries';
import { useQuery } from 'react-apollo';
import { addURLParams } from '../../graphql/APICalls';

// set global context for shop state from backend
const ShopDataContextProvider = (props) => {
  const { children } = props;
  const [shopData, setShopData] = useState();

  const getBackendShopData = useCallback(async(data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    const params = {
      id: data.shop.id
    };

    const url = addURLParams(`${process.env.NEXT_PUBLIC_API_URL}/shop?`, params);

  
    let response = await fetch(url, requestOptions);
    let result = await response.text();
    return JSON.parse(result);
  }, []);

  const { data, loading, error} = useQuery(GET_SHOP, {
    onCompleted: () => {
      // console.log('getshopdata:', data);
      if (data?.shop.privateMetafields.edges.length !== 0) {
        // shop already exists
        // 2. Use this data to get shop data from backend
        getBackendShopData(data)
        .then((result) => {
          console.log(result.Item);
          setShopData(result.Item);
        })
      } else {
        // shop is new
        // 3. Set new shop as status for pages/index to create a new shop in table
        setShopData({...data?.shop, shopStatus: 'new shop'})
      }
    }
  });

  error && console.log('error', error.message);

  return (
    <ShopDataContext.Provider value={{
      data: shopData,
      setData: setShopData
    }}>
      { children }
    </ShopDataContext.Provider>
  )
}

export default ShopDataContextProvider