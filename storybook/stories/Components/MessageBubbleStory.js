import React, { Component } from 'react';
import { View } from 'react-native';
import { MessageBubble } from '../../../app/components/MessageBubble';

export default class MessageBubbleStory extends Component {
  render() {
    return (
      <View>
        <MessageBubble
          placeRight={false}
          message="This bubble should be placed left"
        />
        <MessageBubble
          placeRight
          message="This bubble should be placed right and holds an icon 🏋"
        />
      </View>
    );
  }
}
