import { useMutation } from 'react-apollo';
import { useEffect } from 'react';
import { Spinner, Stack } from '@shopify/polaris';

const MutationPanel = (props) => {
  const { item, MUTATION, input } = props;

  const [runMutation, { data, loading, error }] = useMutation(MUTATION, {
    "variables": input
  });

  useEffect(() => {
    runMutation();
  }, [runMutation]);

  error && console.log(error)
  data && console.log(data);

  return (
    <Stack section>
      <p>{item.title}</p>
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