import { useState } from 'react';
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';
import { ResourcePicker} from '@shopify/app-bridge-react';
import { TitleBar, Button } from '@shopify/app-bridge/actions';
import { 
  Frame, 
  Layout, 
  Card,   
  EmptyState, 
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
  SkeletonThumbnail
} from '@shopify/polaris';

const SelectProducts = () => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const numProductsOnPlan = 5;

  const handleSelection = (selectPayload) => {
    setProducts(selectPayload.selection);
    setIsPickerOpen(false);
  };

  const emptyStateMarkup =
  !products.length ? (
    <EmptyState
      heading="Select products for upload"
      action={{
        content: 'Select products',
        onAction:() => {setIsPickerOpen(true)}
      }}
      image="https://cdn.shopify.com/s/files/1/2376/3301/products/emptystate-files.png"
    >
      <p>
        Choose which products to upload for unique product stories
      </p>
    </EmptyState>
  ) : undefined;

  return (
    <MyPageComponent
      title="Product selection"
      subtitle="Choose which products to upload for their unique product stories"
      pageName="selectProducts"
      secondaryAction={{
        on: true,
        label: "Select products",
        action: () => setIsPickerOpen(true) 
      }}
    >
      <Frame>
        <Layout>
          <Layout.Section>
            <Card>
              <ResourceList
                emptyState={emptyStateMarkup}
                items={products}
                resourceName={{singular: 'product', plural: 'products'}}
                totalItemsCount={products.length}
                showHeader
                renderItem={(product) => {
                  const {id, title, images} = product;
                  const image = images[0];
                  const media = image?.originalSrc ? 
                  <Thumbnail size="medium" source={image?.originalSrc} alt={image?.altText} /> :
                  <SkeletonThumbnail size="medium" />
        
                  return (
                    <ResourceItem
                      id={id}
                      media={media}
                      accessibilityLabel={`Product ${title} selected`}
                    >
                      <h3>
                        <TextStyle variation="strong">{title}</TextStyle>
                      </h3>
                      <div>{id}</div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          </Layout.Section>
          <ResourcePicker 
            resourceType='Product'
            open={isPickerOpen}
            selectMultiple={numProductsOnPlan}
            onSelection={(selectPayload) => handleSelection(selectPayload)}
            onCancel={() => setIsPickerOpen(false)}
          />
        </Layout>
      </Frame>
    </MyPageComponent>
  )
}

export default SelectProducts