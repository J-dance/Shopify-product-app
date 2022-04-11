import { Card, DisplayText, TextContainer } from '@shopify/polaris';
import React from 'react'
import { CSVLink } from "react-csv";

const CsvExporter = (props) => {
  const { products } = props;

  const headers = [
    { label: "Product", key: "name" },
    { label: "ID", key: "id" },
    { label: "Supplier", key: "supplier" }
  ];
  
  const data = products.map((product) => {
    return { 
      name: product.title, 
      id: product.id, 
      supplier: '' 
    }
  });

  return (
    <Card.Section>
      <TextContainer>
        <p>Product selection confirmed!</p>
        <CSVLink data={data} headers={headers}>
          Download CSV template
        </CSVLink>
        <DisplayText size='small'>Email completed template to shopify@bendi.wtf</DisplayText>
      </TextContainer>
    </Card.Section>
  )
}

export default CsvExporter