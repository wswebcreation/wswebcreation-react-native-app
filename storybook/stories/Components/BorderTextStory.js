import React, { Component } from 'react';
import { View } from 'react-native';
import { BorderText } from '../../../app/components/BorderText';

export default class BorderTextStory extends Component {

  render() {
    return (
      <View
      style={{
        padding: 15,
      }}
      >
        <BorderText
          text="Border text component"
        />
      </View>
    );
  }
}
