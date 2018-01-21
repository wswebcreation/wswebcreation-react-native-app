import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

const width = Dimensions.get('window').width;

export default class WebViewSelection extends Component {
  static navigationOptions = {
    title: 'Enter an url and submit it.',
  };

  onSubmitEditing = (event) => {
    const url = event.nativeEvent.text;
    const pattern = /^((http(s)?):\/\/www.)+[a-zA-Z0-9\-.]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;
    if (pattern.test(url)) {
      return this.props.navigation.navigate('WebViewScreen', { url: url });
    } else {
      alert(`${url} is not a valid url!`);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          placeholder="http://www.wswebcreation.nl"
          autoCapitalize='none'
          onSubmitEditing={this.onSubmitEditing}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    height: 40,
    textAlign: 'center',
    width: width * 0.8
  }
});
