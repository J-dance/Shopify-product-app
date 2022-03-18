import { Button } from '@shopify/polaris'
import { useState } from 'react'
import MutationPanel from '../MutationPanel';
import { CREATE_METAFIELD_DEFINITION, SET_METAFIELDS } from '../../graphql/mutations';
import { design, materials, manufacturing, logistics, care, end } from '../../assets/database';

const AddFieldsToProducts = (props) => {
  const { products } = props;
  const [runMutation, setRunMutation] = useState(false);

  // add more if necessary later
  const metafield_definitions_array = [
    {
      name: "Designer image",
      namespace: "bps",
      key: "designerImage",
      description: "Optional image for the designer of the product",
      type: "file_reference",
      validations: [{
        "name": "file_type_options",
        "value": "[\"Image\"]"
      }]
    }
  ]

  const handleClick = () => {
    setRunMutation(true);
  };

  // data for adding product story data to metafields (will be dynamic in future)
  const product_story_section_array = [
    {
      section: 'design',
      data: design
    },
    {
      section: 'materials',
      data: materials
    },
    {
      section: 'manufacturing',
      data: manufacturing
    },
    {
      section: 'logistics',
      data: logistics
    },
    {
      section: 'care',
      data: care
    },
    {
      section: 'end',
      data: end
    },
    {
      section: "settings",
      data: {
        design: true,
        materials: true,
        manufacturing: true,
        logistics: true,
        care: true,
        end: true
      }
    }
  ];

  return (
    <>
      <Button
        primary={true}
        onClick={() => handleClick()}
      >
        Add fields
      </Button>
      {
        runMutation && products.map((product) => {
          const metafield_inputs_array = product_story_section_array.map((section) => {
            return {
              "key": `${section.section}`,
              "namespace": "bps",
              "ownerId": `${product.id}`,
              "type": "json",
              "value": JSON.stringify(section.data)
            }
          });
        
          const set_metafields_input = {
            "metafields": metafield_inputs_array
          };

          return  <MutationPanel 
                    key={product.id} 
                    MUTATION={SET_METAFIELDS}
                    input={set_metafields_input} 
                  />
        })
      }
      {
        runMutation && metafield_definitions_array.map((definition) => {
          const create_metafield_definition_input = {
            "definition": {
              "name": `${definition.name}`,
              "namespace": `${definition.namespace}`,
              "key": `${definition.key}`,
              "description": `${definition.description}`,
              "type": `${definition.type}`,
              "validations": definition.validations,   // must be an array -> empty if none
              "ownerType": "PRODUCT"
            }
          };
          return  <MutationPanel
                    key={definition.key}
                    MUTATION={CREATE_METAFIELD_DEFINITION}
                    input={create_metafield_definition_input}
                  />
        })
      }
    </>
  )
}

export default AddFieldsToProducts