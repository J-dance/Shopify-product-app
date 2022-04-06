import React from 'react';
import { Card, Icon } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  CircleTickMajor
} from '@shopify/polaris-icons';

// shopStatus is manually set to "in review" via aws when bendi recieves data
const ReviewStatusComponent = () => {
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  return (
    <Card 
      sectioned 
      title="Shop status"
      // footerActionAlignment="left"
      // primaryFooterAction={{
      //   content: "View products",
      //   onAction:() => {redirect.dispatch(Redirect.Action.APP, '/select-products')}
      // }}
    >
      <ul style={{listStyleType: 'none'}}>
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Connected to Bendi</p>
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
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Products uploaded</p>
          </div>
        </li>
      </ul>
      <p>We are currently reviewing your uploaded product data and evidence for your product stories.</p>
      <p>We will be in touch when the review is complete!</p>
    </Card>
  )
}

export default ReviewStatusComponent