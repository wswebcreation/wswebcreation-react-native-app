import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { testProperties } from '../config/TestProperties';
import * as labels from '../config/labels.json';

class CustomHeader extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    onPress: () => {
    },
    testID: labels.stackNavigatorTitle.goBackAccessibilityLabel,
    image: null
  };

  static propTypes = {
    onPress: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View
        style={styles.leftHeaderContainer}
        {...testProperties(this.props.testID)}
      >
        <Icon
          name="ios-arrow-back"
          iconStyle={styles.icon}
          onPress={this.props.onPress}
          type="ionicon"
        />
        {this.props.image || null}
        <Text style={styles.headerText}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftHeaderContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  headerText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 7
  },
  icon: {
    color: '#1b73e3',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 28,
    width: 35,
  },
});

export { CustomHeader };
