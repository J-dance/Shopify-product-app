import { Layout, Card, Thumbnail, SkeletonThumbnail, Stack } from '@shopify/polaris';
import { useState } from 'react';
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { ResourcePicker} from '@shopify/app-bridge-react';
import SectionSettings from '../components/SectionSettings';
import ChooseSection from '../components/SectionSettings/ChooseSection/ChooseSection';

const Settings = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [product, setProduct] = useState();

  const handleSelection = (selectPayload) => {
    setProduct(selectPayload.selection[0]);
    setIsPickerOpen(false);
  };

  return (
    <MyPageComponent
      title="Settings"
      subtitle="Edit your product stories here"
      pageName="settings"
      secondaryAction={{ on: false }}
    >
      <Layout>
        <Layout.Section>
          <Card
            title="Select a product"
            primaryFooterAction={{
              content: 'Select product',
              onAction: () => {setIsPickerOpen(true)}
            }}
          >
            <Card.Section>
              <p>To begin editing your product stories you must first select a product to edit.</p>
            </Card.Section>
            {
              product && 
                <Card.Section>
                  <Stack alignment='leading'>
                    {
                      product.images[0]?.originalSrc ? 
                      <Thumbnail source={product.images[0].originalSrc} alt={product.images[0].altText} /> :
                      <SkeletonThumbnail size="medium" />
                    }
                    <Stack vertical='true' >
                      <p>{product.title}</p>
                      <p>{product.id}</p>
                    </Stack>
                  </Stack>
                </Card.Section>
            }

          </Card>
        </Layout.Section> 
        {
          product && 
          <Layout.Section oneHalf>
            <ChooseSection product={product} />
          </Layout.Section>
        }
        {
          product &&
          <Layout.Section oneHalf>
            <SectionSettings product={product} />
          </Layout.Section>
        }
        <ResourcePicker 
          resourceType='Product'
          open={isPickerOpen}
          selectMultiple={false}
          onSelection={(selectPayload) => handleSelection(selectPayload)}
          onCancel={() => setIsPickerOpen(false)}
        />
      </Layout>
    </MyPageComponent>
  )
}

export default Settings