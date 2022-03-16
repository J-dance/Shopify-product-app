import React from 'react';
import MyPageComponent from '../components/MyPageComponent/MyPageComponent';

const Settings = () => {
  return (
    <MyPageComponent
      title="Settings"
      subtitle="Edit your product stsories here"
      pageName="settings"
      secondaryAction={{ on: false }}
    >
      Settings
    </MyPageComponent>
  )
}

export default Settings