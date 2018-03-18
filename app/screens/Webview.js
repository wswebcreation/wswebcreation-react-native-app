import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { BorderText } from '../components/BorderText';
import { CustomHeader } from '../components/CustomHeader';
import * as labels from '../config/labels.json';
import { testProperties } from '../config/TestProperties';

export default class WebViewScreen extends Component {
  static navigationOptions({ navigation }) {
    const headerLeft = (
      <CustomHeader
        onPress={() => navigation.goBack(null)}
        text={labels.stackNavigatorTitle.webview}
      />
    );
    return { headerLeft };
  };

  renderLoading() {
    return (
      <View
        style={styles.loaderContainer}
        {...testProperties(labels.webview.loadingText)}
      >
        <BorderText
          text={labels.webview.loadingText}
        />
      </View>
    )
  }

  render() {
    return (
      <WebView
        renderLoading={this.renderLoading}
        source={{ uri: this.props.navigation.state.params.url }}
        startInLoadingState
      />
    );
  }
}

const styles = StyleSheet.create({
  loaderContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
