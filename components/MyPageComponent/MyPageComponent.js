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
  const { title, subtitle, children } = props;
  const app = useAppBridge();

  // get shop name
  const { data, loading, error} = useQuery(GET_SHOP)
  if (loading) return <Frame><Loading /></Frame>;
  if (error) return `Error! ${error.message}`;

  // title bar setup
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

  // update title bar when data loaded
  data && myTitleBar.set({
    title: `Welcome ${data.shop.name}!`,
  });

  // set navigation menu up
  const onboardingLink = AppLink.create(app, {
    label: 'Onboarding',
    destination: '/onboarding',
  });

  const selectProductLink = AppLink.create(app, {
    label: 'Select products',
    destination: '/select-products',
  });

  const settingsLink = AppLink.create(app, {
    label: 'Settings',
    destination: '/settings',
  });
  
  // or create a NavigationMenu with the settings link active
  const navigationMenu = NavigationMenu.create(app, {
    items: [onboardingLink, selectProductLink, settingsLink],
    active: undefined,
  });

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