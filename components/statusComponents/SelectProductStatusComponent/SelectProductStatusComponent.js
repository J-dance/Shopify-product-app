import React from 'react'
import { Card, Icon } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  CircleTickMajor
} from '@shopify/polaris-icons';

const SelectProductStatusComponent = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  return (
    <Card 
      sectioned 
      title="Shop status"
      footerActionAlignment="left"
      primaryFooterAction={{
        content: "Select products",
        onAction:() => {redirect.dispatch(Redirect.Action.APP, '/select-products')}
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
      </ul>
      <p>Select which products to upload for product stories</p>
    </Card>
  )
}

export default SelectProductStatusComponent