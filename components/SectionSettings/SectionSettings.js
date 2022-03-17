import { useCallback, useState } from 'react'
import  { Card, Form, FormLayout, Button, Select } from '@shopify/polaris';

const SectionSettings = (props) => {
  const { product } = props;
  const [selectedSection, setSelectedSection] = useState()

  const handleSelectChange = useCallback((value) => {
    console.log(value);
    setSelectedSection(value);
  }, []);

  const sections = [
    {label: 'Design', value: 'design'},
    {label: 'Materials', value: 'materials'},
    {label: 'Manufacturing', value: 'manufacturing'},
    {label: 'Logistics', value: 'logistics'},
    {label: 'Care & Use', value: 'care'},
    {label: 'End-of-life', value: 'end'},
  ];

  const handleSubmit = useCallback((_event) => {
    console.log(_event);
  }, []);

  return (
    <Card sectioned>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Select 
            label="Product story section"
            options={sections}
            onChange={handleSelectChange}
            value={selectedSection}
          />
          <Button submit>Save</Button>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default SectionSettings