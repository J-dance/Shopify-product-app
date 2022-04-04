import { useMutation } from 'react-apollo';
import { useEffect } from 'react';
import { Spinner, Stack } from '@shopify/polaris';
import { useAppBridge } from "@shopify/app-bridge-react";
import { Toast } from '@shopify/app-bridge/actions';

const MutationPanel = (props) => {
  const { MUTATION, input, onCompletedAction } = props;
  const app = useAppBridge();

  const [runMutation, { data, loading, error }] = useMutation(MUTATION, {
    "variables": input,
    onCompleted:() => { 
      toastNotice.dispatch(Toast.Action.SHOW);
      onCompletedAction && onCompletedAction(); 
    }
  });

  useEffect(() => {
    runMutation();
  }, [runMutation]);

  const toastOptions = {
    message: 'Successful',
    duration: 5000,
  };

  const toastNotice = Toast.create(app, toastOptions);

  error && console.log(error)
  data && console.log(data);
  
  return (
    <Stack section>
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