import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { BorderText } from '../components/BorderText';
import { CustomHeader } from '../components/CustomHeader';
import * as labels from '../config/labels.json';

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
      <View style={styles.loaderContainer}>
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
        startInLoadingState
        source={{ uri: this.props.navigation.state.params.url }}
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
