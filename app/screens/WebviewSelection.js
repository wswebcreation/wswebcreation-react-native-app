import React, { Component } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { BorderText } from '../components/BorderText';
import { SCREEN_WIDTH } from '../config/Constants';
import * as labels from '../config/labels.json';
import { testProperties } from '../config/TestProperties';

export default class WebViewSelection extends Component {
  static navigationOptions = {
    title: labels.stackNavigatorTitle.webview,
  };
  constructor(props) {
    super(props);
    this.state = {siteUrl: ''};
  }

  addhttp = (url) => {
    return !/^(f|ht)tps?:\/\//i.test(url) ? 'http://' + url : url;
  };

  onSubmitEditing = () => {
    const url = this.addhttp(this.state.siteUrl);
    const pattern = /^((http(s)?):\/\/www.)+[a-zA-Z0-9\-.]{2,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/i;
    if (pattern.test(url)) {
      this._textInput.clear();
      this.setSiteUrl('');
      return this.props.navigation.navigate('WebViewScreen', { url: url });
    } else {
      alert(`${url} ${labels.webview.errorMessage}`);
    }
  };

  setSiteUrl = (siteUrl) => this.setState({siteUrl});

  render() {
    return (
      <View
        style={styles.container}
        {...testProperties(labels.stackNavigatorTitle.webview)}
      >
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          placeholder={labels.webview.placeHolder}
          onChangeText = {this.setSiteUrl}
          style={styles.textInput}
          underlineColorAndroid="transparent"
          ref={component => this._textInput = component}
          {...testProperties(labels.webview.textAccessibilityLabel)}
        />
        <TouchableOpacity
          onPress={this.onSubmitEditing}
          style={styles.button}
          {...testProperties(labels.webview.button)}
        >
          <BorderText
            text={labels.webview.button}
          />
        </TouchableOpacity>
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
    flexDirection: 'row',
  },
  textInput: {
    borderColor: 'gray',
    borderBottomWidth: 1,
    height: 40,
    textAlign: 'center',
    width: SCREEN_WIDTH * 0.75,
  },
  button:{
    marginLeft: SCREEN_WIDTH * 0.03,
    width: SCREEN_WIDTH * 0.15,
  },
});
