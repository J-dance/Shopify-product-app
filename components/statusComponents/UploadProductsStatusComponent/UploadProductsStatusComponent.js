import React from 'react';
import { Card, Icon } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  CircleTickMajor
} from '@shopify/polaris-icons';

const UploadProductsStatusComponent = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  return (
    <Card 
      sectioned 
      title="Shop status"
      footerActionAlignment="left"
      primaryFooterAction={{
        content: "View products",
        onAction:() => {redirect.dispatch(Redirect.Action.APP, '/settings')}
      }}
    >
      <ul style={{listStyleType: 'none'}}>
        <li style={{display: 'inline-flex'}}>
          <Icon
            source={CircleTickMajor}
            color="success" 
          />
          <p style={{marginLeft: '10px'}}>Connected to Bendi</p>
        </li>
        <li style={{display: 'inline-flex'}}>
          <Icon
            source={CircleTickMajor}
            color="success" 
          />
          <p style={{marginLeft: '10px'}}>Products selected</p>
        </li>
      </ul>
      <p>Upload the required data and evidence where specified for your selected products</p>
    </Card>
  )
}

export default UploadProductsStatusComponent