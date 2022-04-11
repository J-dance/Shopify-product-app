import { useContext } from 'react';
import { Card } from '@shopify/polaris';
import { useMutation } from 'react-apollo';
import { CREATE_PRIVATE_METAFIELD } from '../../../graphql/mutations';
import { useAppBridge } from "@shopify/app-bridge-react";
import { Toast } from '@shopify/app-bridge/actions';
import { ShopDataContext } from '../../../assets/context';

const NewShopStatusComponent = (props) => {
  const shopData = useContext(ShopDataContext);
  const app = useAppBridge();

  const create_private_metafield_input = {
    "input": {
      "key": "reviewComplete",
      "namespace": "bps",
      "owner": `${shopData?.data.id}`,
      "valueInput": {
        "value": "false",
        "valueType": "STRING"
      }
    }
  };

  const toastOptions = {
    message: 'Successful',
    duration: 5000,
  };

  const toastNotice = Toast.create(app, toastOptions);

  const [runMutation, { data, loading, error }] = useMutation(CREATE_PRIVATE_METAFIELD, {
    "variables": create_private_metafield_input,
    onCompleted:() => { 
      toastNotice.dispatch(Toast.Action.SHOW);
      shopData?.setData({...shopData?.data, shopStatus: 'select products'});
    }
  });
  data && console.log(data);

  const postNewShop = async(shop) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "id": shop.id,
      "name": shop.name,
      "contactEmail": shop.contactEmail,
      "primaryDomain": shop.primaryDomain,
      "plan": shop.plan,
      "shopStatus": "select products",
      "tier": 4   // number of products on plan
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop`, requestOptions);
    let result = await response.text();
    let obj = await JSON.parse(result);
    console.log(obj)
    runMutation();
  };

  return (
    <Card 
      sectioned 
      title="Shop status"
      footerActionAlignment="left"
      primaryFooterAction={{
        content: "Connect",
        onAction:() => {postNewShop(shopData?.data)}
      }}
    >
      <p>Connect to Bendi to get started with your unique product stories!</p>
    </Card>
  )
}

export default NewShopStatusComponent