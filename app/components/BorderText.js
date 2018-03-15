import React, { PureComponent } from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';

class BorderText extends PureComponent {

  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  render() {
    const { text } = this.props;
    return (
      <Text
        style={[styles.headerBorder, styles.header]}
      >
        {text.toUpperCase()}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  headerBorder: {
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
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    textAlign: 'center'
  },
  header: {
    color: '#000',
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
  },
});

export { BorderText };
