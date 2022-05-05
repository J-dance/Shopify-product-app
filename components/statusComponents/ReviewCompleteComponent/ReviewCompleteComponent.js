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
  const [isComplete, setIsComplete] = useState(false);
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
      // actions={[{
      //   content: 'Settings',
      //   onAction: () => {
      //     redirect.dispatch(Redirect.Action.APP, '/settings');
      //   }
      // }]}
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
          <p>Your product visibility reports are ready! Congratulations 🎉</p>
          <p>Import your product report data below</p>
          <p>Follow the instruction in step 5 of the onboarding instructions to add your product reports</p>
          <p>Customise your product visibility reports in the settings section</p>
        </TextContainer>
        <Stack alignment='center'>
          <Button
            primary
            disabled={isComplete}
            loading={isLoading}
            onClick={handleImport}
          >
            {
              isComplete ? "Complete" : "Import"
            }
          </Button>
          {
            isImporting && <ImportProductStories setIsLoading={setIsLoading} setIsComplete={setIsComplete} />
          }
        </Stack>
      </Stack>
    </Card>
  )
}

export default ReviewCompleteComponent