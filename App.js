import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { StackMainNavigation } from './app/config/router';
import AutomationRestartLink from './app/config/AutomationRestart';

export default class WsWebcreationApp extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StackMainNavigation />
        <AutomationRestartLink />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0eff5',
    flex: 1,
  },
});
