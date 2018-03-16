import React from 'react';
import { View } from 'react-native';

export default storyFn => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f3f3f3',
    }}
  >
    {storyFn()}
  </View>
);
