import { useContext, useEffect, useState } from "react";
import { Card, Layout, Button } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect, Toast } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopDataContext } from "../assets/context";
import { addURLParams } from '../graphql/APICalls';
import { GET_SHOP } from '../graphql/queries';
import { useQuery } from "react-apollo";
import MyLoadingComponent from '../components/MyLoadingComponent';
import NewShopStatusComponent from "../components/statusComponents/NewShopStatusComponent/NewShopStatusComponent";
import SelectProductStatusComponent from "../components/statusComponents/SelectProductStatusComponent/SelectProductStatusComponent";
import { DELETE_PRIVATE_METAFIELD } from "../graphql/mutations";
import MutationPanel from "../components/MutationPanel/MutationPanel";

export default function Index () {
  const shopData = useContext(ShopDataContext);
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [status, setStatus] = useState('');
  const [clearPrivate, setClearPrivate] = useState(false);

  const toastNewShop = Toast.create(app, {
      message: 'New store detected',
      duration: 5000
    }
  );
  
  // 1. get shop data from shopify
  const { data, loading, error, refetch} = useQuery(GET_SHOP);
  error && console.log('error', error);
  
  const getBackendShopData = async(data) => {
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
  };

  
  useEffect(() => {
    console.log('useEffect running');

    if (data) {
      console.log('getshopdata:', data)
      if (data?.shop.privateMetafields.edges.length) {
        // shop already exists
        // 2. Use this data to get shop data from backend
        getBackendShopData(data)
        .then((result) => {
          console.log(result);
          status === '' && setStatus(result.Item.status);
        })
      } else {
        // shop is new
        // 3. create a new shop in db.
        toastNewShop.dispatch(Toast.Action.SHOW);
        status === '' && setStatus('new shop');
      }
    }
  }, [data, toastNewShop, status]);

  const inputDelete = {
    "input": {
      "key": "reviewComplete",
      "namespace": "bps"
    }
  }
  
  if (loading) return <MyLoadingComponent />

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
          {
            status === "new shop" ? <NewShopStatusComponent shop={data.shop} setStatus={setStatus} refetch={refetch} /> :
            status === "select products" ? <SelectProductStatusComponent /> :
            <MyLoadingComponent />
          }
        </Layout.Section>
      </Layout>
      <Button
        onClick={() => setClearPrivate(true)}
      >
        delete
      </Button>
      {
        clearPrivate && <MutationPanel MUTATION={DELETE_PRIVATE_METAFIELD} input={inputDelete} onCompletedAction={() => {
          setClearPrivate(false);
          refetch();
        }} />
      }
    </MyPageComponent>
  );
}
