import { useContext, useEffect } from "react";
import { Card, Layout } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect, Toast } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopContext } from "../assets/context";
import { useMutation } from "react-apollo";
import { CREATE_PRIVATE_METAFIELD } from '../graphql/mutations';

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
 
  // if (shop.privateMetafields.edges.length === 0) {
  //   console.log('new shop alert')
  //   addPrivateField()
  //   toastNotice.dispatch(Toast.Action.SHOW);
  // } else {
  //   console.log('you been ere before')
  //   // run api check for results complete
  // }

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
