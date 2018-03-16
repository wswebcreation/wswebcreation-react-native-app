import React from 'react';
import { View } from 'react-native';

export default storyFn => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#f3f3f3',
    }}
  >
    {storyFn()}
  </View>
);
