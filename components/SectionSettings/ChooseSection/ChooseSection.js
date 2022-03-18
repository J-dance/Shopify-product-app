import { useState, useCallback, useEffect } from 'react';
import { Checkbox, Spinner, Frame, Form, FormLayout, Card, Button, Stack } from '@shopify/polaris';
import { useQuery } from 'react-apollo';
import { GET_PRODUCT_METAFIELD } from '../../../graphql/queries';
import { SET_METAFIELDS } from '../../../graphql/mutations';
import MutationPanel from '../../MutationPanel/MutationPanel';

const ChooseSection = (props) => {
  const { product } = props;
  const [checked, setChecked] = useState();
  const [isValuesChanged, setIsValueschanged] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  const handleChange = useCallback((newChecked, section) => {
    const copy = {...checked};
    copy[section] = newChecked;
    setChecked(copy);
    setIsValueschanged(true)
  }, [checked]);

  const get_product_metafield_input = {
    "namespace": 'bps',
    "key": `settings`,
    "ownerId": `${product.id}`
  };

  const set_product_metafield_input = {
    "metafields": [{
      "namespace": 'bps',
      "key": `settings`,
      "ownerId": `${product.id}`,
      "value": JSON.stringify(checked),
      "type": "json"
    }]
  }

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
    setSaveChanges(true);
  }, []);

  if (loading) return <Frame>
    <Card sectioned>
      <Stack distribution='center' alignment='center'>
        <Spinner />
      </Stack>
    </Card>
  </Frame>;
  
  if (error) return <Card sectioned><p>Oops.. error in retrieving section data</p></Card>

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
          <Stack>
            <Button 
              submit
              disabled={!isValuesChanged}>
              Save
            </Button>
            {
              saveChanges && <MutationPanel 
                MUTATION={SET_METAFIELDS} 
                input={set_product_metafield_input} 
                onCompletedAction={() => {
                  setIsValueschanged(false);
                  setSaveChanges(false)
                }}
              /> 
            }
          </Stack>
        </FormLayout>
      </Form>
    </Card>
  )
}

export default ChooseSection