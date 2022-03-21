import { useCallback, useState } from 'react'
import  { Card, Form, FormLayout, Button, Select } from '@shopify/polaris';
import DesignForm from '../sectionForms/DesignForm';
import MaterialsForm from '../sectionForms/MaterialsForm';
import ManufacturingForm from '../sectionForms/ManufacturingForm';
import LogisticsForm from '../sectionForms/LogisticsForm';
import CareForm from '../sectionForms/CareForm';
import EndForm from '../sectionForms/EndForm';

const SectionSettings = (props) => {
  const { product } = props;
  const [selectedSection, setSelectedSection] = useState('design');

  const handleSelectChange = useCallback((value) => {
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

  const displaySelectedSection = () => {
    let sectionForm;

    switch (selectedSection) {
      case 'design':
        sectionForm = <DesignForm product={product} />
        break;
      case 'materials':
        sectionForm = <MaterialsForm product={product} />
        break;
      case 'manufacturing':
        sectionForm = <ManufacturingForm product={product} />
        break;
      case 'logistics':
        sectionForm = <LogisticsForm product={product} />
        break;
      case 'care':
        sectionForm = <CareForm product={product} />
        break;
      case 'end':
        sectionForm = <EndForm product={product} />
        break;
      default:
        sectionForm = <p>Error finding section data</p>
    };

    return sectionForm
  };

  return (
    <Card sectioned>
      <Card.Section>
        <Select 
          label="Product story section"
          options={sections}
          onChange={handleSelectChange}
          value={selectedSection}
        />
      </Card.Section>
      <Card.Section>
        {
          displaySelectedSection()
        }
      </Card.Section>
    </Card>
  )
}

export default SectionSettings