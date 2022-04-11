import { useContext, useState } from 'react';
import { 
  TitleBar, 
  Button, 
  Redirect,
  NavigationMenu, 
  AppLink
} from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page } from '@shopify/polaris';
import { ShopContext } from '../../assets/context';

const MyPageComponent = (props) => {
  const { title, subtitle, children, pageName, secondaryAction } = props;
  const shop = useContext(ShopContext);
  const app = useAppBridge();
  let secondaryButton;

  // title bar setup
  const primaryButton = Button.create(app, { label: 'Bendi Website' });
  const redirect = Redirect.create(app);
  primaryButton.subscribe('click', () => {
    redirect.dispatch(Redirect.Action.REMOTE, {
      url: 'https://www.bendi.wtf/',
      newContext: true,
    });
  });

  const titleBarOptions = {
    title: `Welcome!`,
    buttons: {
      primary: primaryButton
    }
  };
  
  const myTitleBar = TitleBar.create(app, titleBarOptions);

  // update title bar when data loaded
  shop && myTitleBar.set({
    title: `Welcome ${shop.split('.')[0]}!`,
  });

  // add secondary button action
  if (secondaryAction.on) {
    secondaryButton = Button.create(app, { label: secondaryAction?.label });
    secondaryButton.subscribe('click', () => {
      secondaryAction?.action()
    });
    myTitleBar.set({
      buttons: {
        primary: primaryButton,
        secondary: [secondaryButton]
      }
    });
  };

  // set navigation menu up
  const homeLink = AppLink.create(app, {
    label: 'Home',
    destination: '/',
  });

  const onboardingLink = AppLink.create(app, {
    label: 'Onboarding',
    destination: '/onboarding',
  });

  const selectProductsLink = AppLink.create(app, {
    label: 'Select products',
    destination: '/select-products',
  });

  const settingsLink = AppLink.create(app, {
    label: 'Settings',
    destination: '/settings',
  });
  
  const navigationMenu = NavigationMenu.create(app, {
    items: [homeLink, onboardingLink, selectProductsLink, settingsLink],
    active: undefined,
  });

  // set active page
  pageName === "home" && navigationMenu.set({active: homeLink});
  pageName === "onboarding" && navigationMenu.set({active: onboardingLink});
  pageName === "selectProducts" && navigationMenu.set({active: selectProductsLink});
  pageName === "settings" && navigationMenu.set({active: settingsLink});

  return (
    <Page
      title={title}
      subtitle={subtitle}
    >
      <ShopContext.Provider value={shop}>
        { children }
      </ShopContext.Provider>
    </Page>
  )
}

export default MyPageComponent