import React from 'react'
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { Frame, Layout, Card, TextContainer } from '@shopify/polaris';

const Onboarding = () => {
  return (
    <MyPageComponent
      title="Onboarding"
      subtitle="Follow the instructions to get started with creating your unique product stories"
      pageName="onboarding"
      secondaryAction={{ on: false }}
    >
      <Frame>
        <Layout>
          <Layout.Section secondary>
            <Card 
              sectioned 
              title="Step 1"
              primaryFooterAction={{
                content: 'Create account',
                onAction:() => {console.log('create account')}
              }}
              footerActionAlignment="left" 
            >
              <TextContainer>
                <p>
                  Create an account for your shop with Bendi so we can begin creating your product stories
                </p>
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section primary>
            <Card
              sectioned
              title="Step 2"
            >
              <TextContainer>
                <p>
                  Select the products you wish to upload to Bendi for product stories
                </p>
                <p>
                  Then download the template with the products selected and email the completed template to shopify@bendi.wtf
                </p>
                <p>
                  Once we have recieved this we will email you back with a more detailed form with auto complete features to speed up the process.
                </p>
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section primary>
            <Card
              sectioned
              title="Step 3"
            >
              <TextContainer>
                <p>
                  Complete the detailed form with evidence attached when required and send this back to us for review.
                </p>
                <p>
                  Bendi will process/verify your sumbission and alert you when we have completed the process. We will then get in touch to book a video call to go over the process and answer any questions.
                </p>
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card
              sectioned
              title="Step 4"
            >
              <TextContainer>
                <p>
                  Next, go to the Bendi app in your admin portal and a notifaction will appear asking for permission to add the product story data to your selected store products.
                </p>
              </TextContainer>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card
              sectioned
              title="Step 5"
            >
              <TextContainer>
                <p>
                  Your product stories are ready!
                </p>
                <p>
                  Add the product stories to your product page templates in the theme editor (link here).
                </p>
                <p>
                  Customise appearance in the theme editor settings, add and edit product story data in the settings tab in the bendi app, aswell as in the product pages under metafields (link here).
                </p>
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </Frame>
    </MyPageComponent>
  )
}

export default Onboarding