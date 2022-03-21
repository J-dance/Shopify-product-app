import { useCallback, useState, useEffect} from 'react'
import { Form, FormLayout, Button, TextField, Stack } from '@shopify/polaris';
import { useQuery } from 'react-apollo';
import { GET_PRODUCT_METAFIELD } from '../../../graphql/queries';
import MyLoadingComponent from '../../MyLoadingComponent';
import MutationPanel from '../../MutationPanel/MutationPanel';
import { SET_METAFIELDS } from '../../../graphql/mutations';

const CareForm = (props) => {
  const { product } = props;
  const [sectionValues, setSectionValues] = useState();
  const [isValuesChanged, setIsValueschanged] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);

  const { data, loading, error , refetch } = useQuery(GET_PRODUCT_METAFIELD, {
    "variables": {
      "namespace": "bps",
      "key": 'care',
      "ownerId": `${product.id}`
    },
    onCompleted: () => {
      let resultObj = JSON.parse(data.product.metafield.value);
      setSectionValues(resultObj);
    }
  });

  useEffect(() => {
    refetch()
  }, [refetch])

  const handleChange = useCallback((field, newValue) => {
    setSectionValues({...sectionValues, [field]: newValue});
    setIsValueschanged(true)
  }, [sectionValues]);

  const handleClearButtonClick = useCallback((field) => {
    setSectionValues({...sectionValues, [field]: ''});
  }, [sectionValues]);

  const set_product_metafield_input = {
    "metafields": [{
      "namespace": 'bps',
      "key": `care`,
      "ownerId": `${product.id}`,
      "value": JSON.stringify(sectionValues),
      "type": "json"
    }]
  };

  const handleSubmit = useCallback(() => {
    setSaveChanges(true);
  }, []);

  if (loading) return <MyLoadingComponent />;
  if (error) return <p>Error in finding section data</p>;

  return (
    <Form onSubmit={handleSubmit}>
      <FormLayout>
        <TextField 
          label="Wash settings"
          value={sectionValues?.washSettings}
          onChange={(value) => handleChange('washSettings', value)}
          clearButton
          onClearButtonClick={() => handleClearButtonClick('washSettings')}
          autoComplete="on"
        />
         <TextField 
          label="Wash instructions"
          value={sectionValues?.instructions}
          onChange={(value) => handleChange('instructions', value)}
          clearButton
          onClearButtonClick={() => handleClearButtonClick('instructions')}
          multiline={3}
          autoComplete="on"
        />
        <TextField 
          label="Repair information"
          value={sectionValues?.repair}
          onChange={(value) => handleChange('repair', value)}
          clearButton
          onClearButtonClick={() => handleClearButtonClick('repair')}
          multiline={3}
          autoComplete="on"
        />
        <Stack>
          <Button 
            submit
            disabled={!isValuesChanged} 
          >Save</Button>
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
  )
}

export default CareForm