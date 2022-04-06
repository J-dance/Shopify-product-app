import { useState } from 'react';
import { Card, Icon, TextContainer, Button, Stack } from '@shopify/polaris';
import { Redirect } from '@shopify/app-bridge/actions';
import { useAppBridge } from "@shopify/app-bridge-react";
import {
  CircleTickMajor
} from '@shopify/polaris-icons';
import ImportProductStories from './ImportProductStories/ImportProductStories';

// shop status manually changed to "review complete"
const ReviewCompleteComponent = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const app = useAppBridge();
  const redirect = Redirect.create(app);

  const handleImport = () => {
    console.log('importing');
    setIsImporting(true);
    setIsLoading(true);
  }

  return (
    <Card 
      sectioned 
      title="Shop status"
      actions={[{
        content: 'Settings',
        onAction: () => {
          redirect.dispatch(Redirect.Action.APP, '/settings');
        }
      }]}
    >
      <ul style={{listStyleType: 'none'}}>
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Connected to Bendi</p>
          </div>
        </li>
        <li >
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Products selected</p>
          </div>
        </li>
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Product data in review</p>
          </div>
        </li>
        <li>
          <div style={{display: 'inline-flex'}}>
            <Icon
              source={CircleTickMajor}
              color="success" 
            />
            <p style={{marginLeft: '10px'}}>Review complete!</p>
          </div>
        </li>
      </ul>
      <Stack spacing="loose" vertical>
        <TextContainer>
          <p>Your product stories ar ready! Congratulations 🎉</p>
          <p>Import your product story data below</p>
          <p>Follow the instruction in step 5 of the onboarding instructions to add your product stories</p>
          <p>Customise your product stories in the settings section</p>
        </TextContainer>
        <Stack alignment='center'>
          <Button
            primary
            loading={isLoading}
            onClick={handleImport}
          >
            Import
          </Button>
          {
            isImporting && <ImportProductStories setIsLoading={setIsLoading} />
          }
        </Stack>
      </Stack>
    </Card>
  )
}

export default ReviewCompleteComponent