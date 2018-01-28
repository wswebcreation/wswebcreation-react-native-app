import React, { Component } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import * as labels from '../config/labels.json';
import { testProperties } from '../config/TestProperties';

const width = Dimensions.get('window').width;

export default class WebViewSelection extends Component {
  static navigationOptions = {
    title: labels.stackNavigatorTitle.webview,
  };

  addhttp = (url) => {
    return !/^(f|ht)tps?:\/\//i.test(url) ? 'http://' + url : url;
  };

  onSubmitEditing = (event) => {
    const url = this.addhttp(event.nativeEvent.text);
    const pattern = /^((http(s)?):\/\/www.)+[a-zA-Z0-9\-.]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;
    if (pattern.test(url)) {
      return this.props.navigation.navigate('WebViewScreen', { url: url });
    } else {
      alert(`${url} ${labels.webview.errorMessage}`);
    }
  };

  render() {
    return (
      <View
        style={styles.container}
        {...testProperties(labels.stackNavigatorTitle.webview)}
      >
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onSubmitEditing={this.onSubmitEditing}
          placeholder={labels.webview.placeHolder}
          style={styles.textInput}
          underlineColorAndroid="transparent"
          {...testProperties(labels.webview.textAccessibilityLabel)}
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
