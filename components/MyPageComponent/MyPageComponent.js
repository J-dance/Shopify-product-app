import React from 'react'
import { TitleBar, Button, Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page } from '@shopify/polaris';
import { gql } from 'apollo-boost';
import { useQuery } from "react-apollo";

const MyPageComponent = (props) => {
  const { title, subtitle, children } = props;
  const app = useAppBridge();

  const primaryButton = Button.create(app, { label: 'Save' });
  const settingsButton = Button.create(app, { label: 'Settings' });

  const redirect = Redirect.create(app);

  settingsButton.subscribe('click', () => {
    redirect.dispatch({
      type: Redirect.Action.APP,
      payload: { path: '/settings' }
    });
  });

  const titleBarOptions = {
    title: `Welcome!`,
    buttons: {
      primary: primaryButton,
      secondary: [settingsButton]
    },
  };
  
  const myTitleBar = TitleBar.create(app, titleBarOptions);
  
  return (
    <Page
      title={title}
      subtitle={subtitle}
      fullWidth
    >
      { children }
    </Page>
  )
}

export default MyPageComponent