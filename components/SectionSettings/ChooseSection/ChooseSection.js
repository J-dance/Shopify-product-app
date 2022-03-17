import { useState, useCallback, useEffect } from 'react';
import { Checkbox, Spinner, Frame, Form, FormLayout, Card, Button, Stack } from '@shopify/polaris';
import { useQuery } from 'react-apollo';
import { GET_PRODUCT_METAFIELD } from '../../../graphql/queries';

const ChooseSection = (props) => {
  const { product } = props;
  const [checked, setChecked] = useState();
  const [isValuesChanged, setIsValueschaged] = useState(false);

  const handleChange = useCallback((newChecked, section) => {
    const copy = {...checked};
    copy[section] = newChecked;
    setChecked(copy);
  }, [checked]);

  const get_product_metafield_input = {
    "namespace": 'bps',
    "key": `settings`,
    "ownerId": `${product.id}`
  };

  const { data, loading, error } = useQuery(GET_PRODUCT_METAFIELD, {
    "variables": get_product_metafield_input
  });

  useEffect(() => {
    if (data) {
      const settingsStr = data.product.metafield.value;
      const settingsObj = JSON.parse(settingsStr);
      setChecked(settingsObj);
    }
  }, [data]);

  const handleSubmit = useCallback(() => {
    console.log(checked);
  }, [checked]);

  if (loading) return <Frame>
    <Card sectioned>
      <Stack distribution='center' alignment='center'>
        <Spinner />
      </Stack>
    </Card>
  </Frame>;
  
  if (error) return <p>Oops.. error in retrieving section data</p>

  return (
    <Card sectioned title="Choose which sections to display">
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <Checkbox
            label="Design"
            checked={checked?.design}
            onChange={(checked) => { handleChange(checked, 'design')}}
          />
          <Checkbox
            label="Materials"
            checked={checked?.materials}
            onChange={(checked) => { handleChange(checked, 'materials')}}
          />
          <Checkbox
            label="Manufacturing"
            checked={checked?.manufacturing}
            onChange={(checked) => { handleChange(checked, 'manufacturing')}}
          />
          <Checkbox
            label="Logistics"
            checked={checked?.logistics}
            onChange={(checked) => { handleChange(checked, 'logistics')}}
          />
          <Checkbox
            label={`Care & Use`}
            checked={checked?.care}
            onChange={(checked) => { handleChange(checked, 'care')}}
          />
          <Checkbox
            label={`End-of-life`}
            checked={checked?.end}
            onChange={(checked) => { handleChange(checked, 'end')}}
          />
          <Button submit>Save</Button>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default ChooseSection