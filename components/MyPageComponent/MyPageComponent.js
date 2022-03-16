import { 
  TitleBar, 
  Button, 
  Redirect,
  NavigationMenu, 
  AppLink
} from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import { Page, Frame, Loading } from '@shopify/polaris';
import { useQuery } from "react-apollo";
import { GET_SHOP } from '../../graphql/queries';

const MyPageComponent = (props) => {
  const { title, subtitle, children, pageName, secondaryAction } = props;
  const app = useAppBridge();
  let secondaryButton;

  // get shop name
  const { data, loading, error} = useQuery(GET_SHOP)
  if (loading) return <Frame><Loading /></Frame>;
  if (error) return `Error! ${error.message}`;

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
  data && myTitleBar.set({
    title: `Welcome ${data.shop.name}!`,
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
    items: [onboardingLink, selectProductsLink, settingsLink],
    active: undefined,
  });

  // set active page
  pageName === "onboarding" && navigationMenu.set({active: onboardingLink});
  pageName === "selectProducts" && navigationMenu.set({active: selectProductsLink});
  pageName === "settings" && navigationMenu.set({active: settingsLink});

  return (
    <Page
      title={title}
      subtitle={subtitle}
    >
      { children }
    </Page>
  )
}

export default MyPageComponent