import { CREATE_METAFIELDS } from '../../graphql/mutations';
import { useMutation } from 'react-apollo';
import { design, materials, manufacturing, logistics, care, end } from '../../assets/database';
import { useEffect } from 'react';
import { Spinner, Stack } from '@shopify/polaris';

const MutationPanel = (props) => {
  const { product } = props;

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

  const metafield_inputs = product_story_section_array.map((section) => {
    return {
      "key": `${section.section}`,
      "namespace": "bps",
      "ownerId": `${product.id}`,
      "type": "json",
      "value": JSON.stringify(section.data)
    }
  });

  const [addDataToProducts, { data, loading, error }] = useMutation(CREATE_METAFIELDS, {
    "variables": {
      "metafields": metafield_inputs
    }
  });

  useEffect(() => {
    addDataToProducts();
  }, [addDataToProducts]);

  error && console.log(error)
  data && console.log(data);

  return (
    <Stack section>
      <p>{product.title}</p>
      {
        loading && <Spinner />
      }
      {
        data && <p>Complete</p>
      }
      {
        error && <p>oops.. an error occurred</p>
      }
    </Stack>
  )
}

export default MutationPanel