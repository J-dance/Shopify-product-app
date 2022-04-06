import React from 'react'
import { 
  ResourceList,
  ResourceItem,
  TextStyle,
  Thumbnail,
  SkeletonThumbnail,
} from '@shopify/polaris';

const MyResourceList = (props) => {
  const { products, emptyStateMarkup, isCompleted } = props;

  return (
    <ResourceList
      emptyState={emptyStateMarkup}
      items={products}
      resourceName={{singular: 'product', plural: 'products'}}
      totalItemsCount={products.length}
      showHeader
      renderItem={(product) => {
        let currentProduct = product;
        if (isCompleted) { 
          currentProduct = product.node
        };
        
        const {id, title, images, featuredImage} = currentProduct;
        let image;
        
        if (images !== undefined) {
          image = images[0];
        }
        else if (featuredImage !== null) {
          image = {
            originalSrc: featuredImage.url,
            altText: featuredImage.altText
          }
        }
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
  )
}

export default MyResourceList