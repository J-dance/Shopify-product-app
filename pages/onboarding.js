import React from 'react'
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { Frame, Layout, Card, TextContainer } from '@shopify/polaris';

const Onboarding = () => {
  return (
    <MyPageComponent
      title="Onboarding"
      subtitle="Follow the instructions to get started with creating your unique product reports"
      pageName="onboarding"
      secondaryAction={{ on: false }}
    >
      <Frame>
        <Layout>
          <Layout.Section secondary>
            <Card 
              sectioned 
              title="Step 1" 
            >
              <TextContainer>
                <p>
                  Connect your shop with our back-end so we can begin creating your product reports
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
                  Select the products you wish to upload for product reports
                </p>
                <p>
                  Then download the template with the products selected and email the completed template to shopify@company.com
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
                  We will process/verify your sumbission and alert you when we have completed the process. We will then get in touch to book a video call to go over the process and answer any questions.
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
                  Next, go to the app in your admin portal and a notifaction will appear asking for permission to add the product story data to your selected store products.
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
                  Your product reports are ready!
                </p>
                <p>
                  {`Add the product reports to your product page templates in the theme editor. We recommend creating a new product page template by duplicating your current product template and renaming this to something memorable such as 'product_page_with_report'.`}
                </p>
                <p>
                  {`Click 'add block' once on the product template page in the theme editor and select the Bendi option then preview and save. Next, go to your store products in the admin portal and select the new product template with the visibility report for each product necessary and save.`}
                </p>
                <p>
                  Customise appearance in the theme editor settings, add and edit some product report features in the product pages under metafields.
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