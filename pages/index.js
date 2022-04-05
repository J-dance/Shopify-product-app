import { useContext, useState } from "react";
import { Card, Layout, Button } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopDataContext } from "../assets/context";
import MyLoadingComponent from '../components/MyLoadingComponent';
import NewShopStatusComponent from "../components/statusComponents/NewShopStatusComponent/NewShopStatusComponent";
import SelectProductStatusComponent from "../components/statusComponents/SelectProductStatusComponent/SelectProductStatusComponent";
import UploadProductsStatusComponent from "../components/statusComponents/UploadProductsStatusComponent/UploadProductsStatusComponent";
import { DELETE_PRIVATE_METAFIELD } from "../graphql/mutations";
import MutationPanel from "../components/MutationPanel/MutationPanel";

export default function Index () {
  const shopData = useContext(ShopDataContext);
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [status, setStatus] = useState('');
  const [clearPrivate, setClearPrivate] = useState(false);
  
  // console.log(shopData);

  const inputDelete = {
    "input": {
      "key": "reviewComplete",
      "namespace": "bps"
    }
  }
  
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
            shopData?.status === "new shop" ? <NewShopStatusComponent shop={shopData} setStatus={setStatus} refetch={refetch} /> :
            shopData?.status === "select products" ? <SelectProductStatusComponent /> :
            shopData?.status === "upload products" ? <UploadProductsStatusComponent /> :
            <Card><MyLoadingComponent /></Card>
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
