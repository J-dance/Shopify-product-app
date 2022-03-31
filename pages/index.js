import { useContext, useEffect } from "react";
import { Card, Layout } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect, Toast } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopContext } from "../assets/context";
// import { useMutation } from "react-apollo";
// import { CREATE_PRIVATE_METAFIELD } from '../graphql/mutations';
// import { useQuery } from 'react-query';
import { addURLParams } from '../graphql/APICalls';
import { GET_SHOP } from '../graphql/queries';
import { useQuery } from "react-apollo";
import MyLoadingComponent from '../components/MyLoadingComponent';

export default function Index () {
  const shop = useContext(ShopContext);
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const toastOptions = {
    message: 'New store detected',
    duration: 5000,
  };

  const toastNotice = Toast.create(app, toastOptions);

  const { data, loading, error} = useQuery(GET_SHOP);

  if (loading) return <MyLoadingComponent />;
  if (error) return <p>Error! ${error.message}</p>;
  if (data) {
    console.log('getshopdata:', data)
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

    fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result)))
    .catch(error => console.log('error', error));
  };

  // const create_private_metafield_input = {
  //   "input": {
  //     "key": "reviewComplete",
  //     "namespace": "bps",
  //     "owner": `${shop.id}`,
  //     "valueInput": {
  //       "value": "false",
  //       "valueType": "STRING"
  //     }
  //   }
  // };

  // const [addPrivateField, { data, loading, error }] = useMutation(CREATE_PRIVATE_METAFIELD, {
  //   "variables": create_private_metafield_input
  // });

  // const bendiBackendRes = useQuery('getShop', fetchShopData("Rod", "Stewart"));
  // bendiBackendRes.isError && console.log(bendiBackendRes.error.message);
  // bendiBackendRes.isLoading && console.log('loading bendi data');

  // if (shop.privateMetafields.edges.length === 0) {
  //   console.log('new shop alert')
  //   addPrivateField()
  //   toastNotice.dispatch(Toast.Action.SHOW);
  // } else {
  //   console.log('you been ere before')
  //   // run api check for results complete
  // }
  
  return (
    <MyPageComponent
      title="Welcome to Bendi!"
      subtitle="Build your unique product visibility stories and increase customer engagement"
      secondaryAction={{ on: false }}
    >
      <Layout>
        <Layout.Section>
          <Card 
            sectioned 
            title="Getting started" 
            actions={[{
                content: 'Onboarding',
                onAction: () => {
                  redirect.dispatch(Redirect.Action.APP, '/onboarding');
                }
              }]}>
            <p>
              Head over to our onboarding page to get started with adding your product stories!
            </p>
          </Card>
        </Layout.Section>
      </Layout>
    </MyPageComponent>
  );
}
