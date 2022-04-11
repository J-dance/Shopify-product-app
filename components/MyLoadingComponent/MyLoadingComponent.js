import { Frame, Card, Stack, Spinner } from '@shopify/polaris';

const MyLoadingComponent = () => {
  return (
    // <Frame>
      <Stack distribution='center' alignment='center'>
        <Spinner />
      </Stack>
    // </Frame>
  )
}

export default MyLoadingComponent