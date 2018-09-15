import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import RNRestart from 'react-native-restart';
import { IS_AUTOMATION_BUILD } from './Constants';
import { testProperties } from './TestProperties';
import labels from './labels.json';

class AutomationRestartLink extends Component {
  handleRestartApp = () => RNRestart.Restart();

  render() {
    return IS_AUTOMATION_BUILD ? (
      <TouchableOpacity
        onPress={this.handleRestartApp}
        style={styles.container}
        {...testProperties(labels.restartDot)}
      />
    ) : null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    bottom: 0,
    right: 0,
    height: 1,
    width: 1,
  },
});

export default AutomationRestartLink;
