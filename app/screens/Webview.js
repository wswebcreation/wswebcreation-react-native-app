import React, { Component } from 'react';
import { StyleSheet, View, WebView } from 'react-native';
import { BorderText } from '../components/BorderText';

export default class WebViewScreen extends Component {
  renderLoading() {
    return (
      <View style={styles.loaderContainer}>
        <BorderText
          text="Loading your requested website"
        />
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
});
