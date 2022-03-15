import React from 'react'
import { TitleBar, Button, Redirect } from '@shopify/app-bridge/actions';
import { Page } from '@shopify/polaris';

const MyPageComponent = (props) => {
  const { children } = props;

  const saveButton = Button.create(app, { label: 'Save' });

  const settingsButton = Button.create(app, { label: 'Settings' });
  const redirect = Redirect.create(app);
  settingsButton.subscribe('click', () => {
    redirect.dispatch({
      type: Redirect.Action.APP,
      payload: { path: '/settings' }
    });
  });

  const titleBarOptions = {
    title: 'My page title',
    buttons: {
      primary: saveButton,
      secondary: [settingsButton]
    },
  };
  
  const myTitleBar = TitleBar.create(app, titleBarOptions);
  
  return (
    <Page>
      { children }
    </Page>
  )
}

export default MyPageComponent