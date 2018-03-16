import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { ChatInput } from '../../../app/components/ChatInput';

export default class BorderTextStory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: 'I\'m already filled\nEmpty me or start typing.',
    };
  }

  handleOnPress = () => {
    Alert.alert(
      'Chat input alert',
      this.state.message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
    )
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        />
        <ChatInput
          onChangeText={(message) => this.setState({ message })}
          onPress={() => this.handleOnPress()}
          value={this.state.message}
        />
      </View>
    );
  }
}
