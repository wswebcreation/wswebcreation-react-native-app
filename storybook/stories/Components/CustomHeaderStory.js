import React, { Component } from 'react';
import { Alert } from 'react-native';
import { CustomHeader } from '../../../app/components/CustomHeader';

export default class CustomHeaderStory extends Component {
  handleOnPress = () => {
    Alert.alert(
      'Custom header alert',
      'You pressed the custom header',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
    )
  };

  render() {
    return (
      <CustomHeader
        onPress={() => this.handleOnPress()}
        text="This is a customer header"
      />
    );
  }
}
