import React, { Component } from 'react';
import {
  Animated,
  Easing,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class AnimationStory extends Component {
  state = {
    animatedValue: new Animated.Value(0),
  };

  animate = () => {
    this.state.animatedValue.setValue(0);
    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 1500,
        easing: Easing.elastic(1)
      }
    ).start();
  };

  renderButton() {
    return (
      <TouchableOpacity
        onPress={this.animate}
        style={styles.button}
        accessibilityLabel="test-Button"
      >
        <Text style={styles.text}>CLICK ME</Text>
      </TouchableOpacity>
    )
  }

  renderMessage() {
    const marginLeft = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-120, 0],
    });
    return (
      <Animated.View
        style={[
          styles.messageBox,
          {
            opacity: this.state.animatedValue,
            marginLeft
          }]}
      >
        <Text style={styles.text}>I'M AN ANIMATED BOX</Text>
      </Animated.View>
    );
  }

  render() {
    return (
      <View
        style={{
          padding: 15,
        }}
      >
        {this.renderButton()}
        {this.renderMessage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 3,
    ...Platform.select({
      ios: {
        paddingBottom: 9,
      },
      android: {
        paddingBottom: 4,
      },
    }),
    marginBottom: 15,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    width: 150,
  },
  text: {
    color: '#000',
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  messageBox: {
    marginTop: 50,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 3,
    ...Platform.select({
      ios: {
        paddingBottom: 9,
      },
      android: {
        paddingBottom: 4,
      },
    }),
    padding: 10,
    shadowColor: '#000',
    width: 275,
    shadowOpacity: 0.5,
  },
});
