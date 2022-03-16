import { Button } from '@shopify/polaris'
import { useState } from 'react'
import MutationPanel from '../MutationPanel';

const AddFieldsToProducts = (props) => {
  const { products } = props;
  const [runMutation, setRunMutation] = useState(false);

  const handleClick = () => {
    setRunMutation(true);
  };

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
          return <MutationPanel key={product.id} product={product} />
        })
      }
    </>
  )
}

export default AddFieldsToProducts