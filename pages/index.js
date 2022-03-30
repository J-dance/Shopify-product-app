import { useContext } from "react";
import { Card, Layout } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect, Toast } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopContext } from "../assets/context";
import { useMutation } from "react-apollo";
import { CREATE_PRIVATE_METAFIELD } from '../graphql/mutations';
import { useQuery } from 'react-query';
import axios from "axios";

export default function Index() {
  const shop = useContext(ShopContext);
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const toastOptions = {
    message: 'New store detected',
    duration: 5000,
  };

  const toastNotice = Toast.create(app, toastOptions);

  const create_private_metafield_input = {
    "input": {
      "key": "reviewComplete",
      "namespace": "bps",
      "owner": `${shop.id}`,
      "valueInput": {
        "value": "false",
        "valueType": "STRING"
      }
    }
  };

  const [addPrivateField, { data, loading, error }] = useMutation(CREATE_PRIVATE_METAFIELD, {
    "variables": create_private_metafield_input
  });

  const fetchShopData = async(firstName, lastName) => {
    const myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    const raw = JSON.stringify({"firstName":firstName,"lastName":lastName});
    // create a JSON object with parameters for API call and store in a variable
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    fetch("https://hpy5qebngg.execute-api.eu-west-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => console.log(JSON.parse(result).body))
    .catch(error => console.log('error', error));
  
  };

  const bendiBackendRes = useQuery('getShop', fetchShopData("Rod", "Stewart"));
  bendiBackendRes.isError && console.log(bendiBackendRes.error.message);
  bendiBackendRes.isLoading && console.log('loading bendi data');

  if (shop.privateMetafields.edges.length === 0) {
    console.log('new shop alert')
    addPrivateField()
    toastNotice.dispatch(Toast.Action.SHOW);
  } else {
    console.log('you been ere before')
    // run api check for results complete
  }

  error && console.log(error.message);
  data && console.log(data);
  
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
