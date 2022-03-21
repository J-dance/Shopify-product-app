import { Frame, Card, Stack, Spinner } from '@shopify/polaris';

const MyLoadingComponent = () => {
  return (
    // <Frame>
      <Card sectioned>
        <Stack distribution='center' alignment='center'>
          <Spinner />
        </Stack>
      </Card>
    // </Frame>
  )
}

export default MyLoadingComponent