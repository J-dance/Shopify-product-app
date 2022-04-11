import { Layout, Card, Thumbnail, SkeletonThumbnail, Stack, TextContainer } from '@shopify/polaris';
import { useState, useContext, useEffect } from 'react';
import { ShopDataContext } from '../assets/context';
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { ResourcePicker} from '@shopify/app-bridge-react';
import SectionSettings from '../components/SectionSettings';
import ChooseSection from '../components/SectionSettings/ChooseSection/ChooseSection';
import MyLoadingComponent from '../components/MyLoadingComponent';

const Settings = () => {
  const shopData = useContext(ShopDataContext);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [product, setProduct] = useState();
  const [initialQueryString, setInitialQueryString] = useState('');
  const [isReviewComplete, setIsReviewComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let products = shopData?.data?.products;
    let query = '';

    if (products !== undefined) {
      setIsReviewComplete(true);
      setIsLoading(false);
      products.forEach((product, index) => {
        if (index === 0) {
          query = query.concat(`title:'${product.title}'`)
        } else {
          query = query.concat(` OR title:'${product.title}'`)
        }
      });
    } else {
      setIsLoading(false);
    }
    setInitialQueryString(query);
  }, [shopData]);

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
            primaryFooterAction={ isReviewComplete && {
              content: 'Select product',
              onAction: () => {setIsPickerOpen(true)}
            }}
          >
            {
              isLoading ? <MyLoadingComponent /> :
              <>
                {
                  isReviewComplete ? <>
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
                  </> :
                  <Card.Section>
                    <TextContainer>
                    <p>Product stories are not yet complete</p>
                    <p>Please view the Home page for your status</p>
                    </TextContainer>
                  </Card.Section>
                }
              </>
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
          initialQuery={initialQueryString}
          selectMultiple={false}
          onSelection={(selectPayload) => handleSelection(selectPayload)}
          onCancel={() => setIsPickerOpen(false)}
        />
      </Layout>
    </MyPageComponent>
  )
}

export default Settings