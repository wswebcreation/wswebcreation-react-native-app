import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import Text from 'react-native-elements/src/text/Text';

export default class WebViewScreen extends Component {
  renderLoading() {
    return (
      <View style={styles.loaderContainer}>
        <Text
          style={styles.loader}
        >LOADING YOUR REQUESTED WEBSITE</Text>
      </View>
    )
  }

  render() {
    return (
      <WebView
        source={{ uri: this.props.navigation.state.params.url }}
        renderLoading={this.renderLoading}
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
  loader: {
    borderColor: '#000',
    borderWidth: 3,
    fontFamily: 'Roboto Mono',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 9,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    textAlign: 'center'
  },
});