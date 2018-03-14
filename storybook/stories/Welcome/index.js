import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import centerDecorator from '../../decorators/centerDecorator';

const WelcomeScreen = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Welcome to React Native Storybook</Text>
      <Text style={styles.content}>
        This is a UI Component development environment for your React Native app. Here you can
        display and interact with your UI components as stories. A story is a single state of one
        or more UI components. You can have as many stories as you want. In other words a story is
        like a visual test case.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 15,
  },
  header: {
    fontSize: 18,
    marginBottom: 18,
  },
  content: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 18,
  },
});

storiesOf('Welcome', module)
  .addDecorator(centerDecorator)
  .add('to Storybook', () => <WelcomeScreen/>);
