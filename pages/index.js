import { useContext, useState, useEffect } from "react";
import { Card, Layout, Button } from "@shopify/polaris";
import MyPageComponent from "../components/MyPageComponent/MyPageComponent";
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { ShopDataContext } from "../assets/context";
import MyLoadingComponent from '../components/MyLoadingComponent';
import NewShopStatusComponent from "../components/statusComponents/NewShopStatusComponent/NewShopStatusComponent";
import SelectProductStatusComponent from "../components/statusComponents/SelectProductStatusComponent/SelectProductStatusComponent";
import UploadProductsStatusComponent from "../components/statusComponents/UploadProductsStatusComponent/UploadProductsStatusComponent";
import ReviewStatusComponent from "../components/statusComponents/ReviewStatusComponent/ReviewStatusComponent";
import ReviewCompleteComponent from "../components/statusComponents/ReviewCompleteComponent/ReviewCompleteComponent";
import { DELETE_PRIVATE_METAFIELD } from "../graphql/mutations";
import MutationPanel from "../components/MutationPanel/MutationPanel";
import { Toast } from '@shopify/app-bridge/actions';

// to limit bendi api calls - only call shop data here and update private metafields with all data
export default function Index () {
  const shopData = useContext(ShopDataContext);
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [clearPrivate, setClearPrivate] = useState(false);
  
  const toastNewShop = Toast.create(app, {
    message: 'New store detected',
    duration: 5000
  });

  const toastShopFound = Toast.create(app, {
    message: 'Store connected',
    duration: 5000
  });

  useEffect(() => {
    if (shopData?.data?.shopStatus === 'new shop') {
      toastNewShop.dispatch(Toast.Action.SHOW);
    } else if (typeof shopData?.data?.shopStatus === 'string') {
      toastShopFound.dispatch(Toast.Action.SHOW);
    }
  }, [shopData?.data, toastNewShop, toastShopFound]);

  const inputDelete = {
    "input": {
      "key": "reviewComplete",
      "namespace": "bps"
    }
  }
  
  return (
    <MyPageComponent
      title="Welcome!"
      subtitle="Build your unique product visibility report and increase customer engagement"
      secondaryAction={{ on: false }}
      pageName="home"
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
              Head over to our onboarding page to get started with adding your product visibility reports!
            </p>
          </Card>
          {
            shopData?.data?.shopStatus === "new shop" ? <NewShopStatusComponent /> :
            shopData?.data?.shopStatus === "select products" ? <SelectProductStatusComponent /> :
            shopData?.data?.shopStatus === "upload products" ? <UploadProductsStatusComponent /> :
            shopData?.data?.shopStatus === "in review" ? <ReviewStatusComponent /> :
            shopData?.data?.shopStatus === "review complete" ? <ReviewCompleteComponent /> :
            <Card sectioned><MyLoadingComponent /></Card>
          }
        </Layout.Section>
      </Layout>
      {/* <Button
        onClick={() => setClearPrivate(true)}
      >
        delete
      </Button> */}
      {/* {
        clearPrivate && <MutationPanel MUTATION={DELETE_PRIVATE_METAFIELD} input={inputDelete} onCompletedAction={() => {
          setClearPrivate(false);
        }} />
      } */}
    </MyPageComponent>
  );
}
