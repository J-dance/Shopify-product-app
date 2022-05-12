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
        onAction:() => {redirect.dispatch(Redirect.Action.APP, '/select-products')}
      }}
    >
      <ul style={{listStyleType: 'none'}}>
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Connected to our back-end</p>
          </div>
        </li>
        <li >
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Products selected</p>
          </div>
        </li>
      </ul>
      <p>Upload the required data and evidence where specified for your selected products</p>
    </Card>
  )
}

export default UploadProductsStatusComponent