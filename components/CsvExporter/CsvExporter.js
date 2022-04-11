import { Card, DisplayText, TextContainer } from '@shopify/polaris';
import { useEffect, useState } from 'react'
import { CSVLink } from "react-csv";
import { templateString } from '../../assets/productDataSheet.js';

const CsvExporter = (props) => {
  const { products } = props;
  const [productDataString, setProductDataString] = useState('');

  useEffect(() => {
    let productHeaders = '';
    let productGaps = '';

    products.forEach((product, index) => {
      if (index === 0) {
        productHeaders = productHeaders.concat(`${product.title}'`);
      } else {
        productHeaders = productHeaders.concat(`;${product.title}`);
        productGaps = productGaps.concat(';')
      }
    });
  
    const tempStr = templateString.replace("ANSWER", productHeaders);
    const completeStr = tempStr.replace(/removeME/g, productGaps);
    setProductDataString(completeStr);
  }, [setProductDataString, products]);

  return (
    <Card.Section>
      <TextContainer>
        <p>Product selection confirmed!</p>
        <CSVLink 
          data={productDataString} 
          separator={";"} 
          filename={"bendi_product_story_data_sheet.csv"}
          target="_blank"
        >
          Download CSV template
        </CSVLink>
        <DisplayText size='small'>Email completed template to shopify@bendi.wtf</DisplayText>
      </TextContainer>
    </Card.Section>
  )
}

export default CsvExporter