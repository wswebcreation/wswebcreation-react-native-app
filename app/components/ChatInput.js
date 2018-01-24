import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PropTypes from 'prop-types';
import { IS_IOS, SCREEN_HEIGHT } from '../config/Constants';
import * as labels from '../config/labels.json';
import { testProperties } from '../config/TestProperties';

const defaultHeight = 30;

class ChatInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: defaultHeight
    };
  }

  static defaultProps = {
    onChangeText: () => {
    },
    onPress: () => {
    },
  };

  static propTypes = {
    onChangeText: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };

  updateSize(autoHeight) {
    const maxInputHeight = 0.25 * SCREEN_HEIGHT;
    autoHeight = autoHeight < defaultHeight ? defaultHeight : autoHeight;
    this.setState({
      height: autoHeight > maxInputHeight ? maxInputHeight + 10 : autoHeight + 10
    });
  }

  renderKeyboardSpacer = () => {
    if (IS_IOS) {
      return <KeyboardSpacer/>;
    }
  };

  render() {
    const { height } = this.state;
    let newStyle = {
      height
    };
    return (
      <View>
        <View style={styles.container}>
          <TouchableOpacity
            {...testProperties(labels.components.chatInput.addAccessibilityLabel)}
          >
            <Icon
              name="plus"
              iconStyle={styles.chatIcons}
              type="feather"
            />
          </TouchableOpacity>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            onContentSizeChange={(e) =>
              this.updateSize(e.nativeEvent.contentSize.height)
            }
            placeholder={labels.components.chatInput.placeholder}
            placeholderTextColor="#EDEDED"
            returnKeyType="next"
            selectionColor="white"
            style={[styles.input, newStyle]}
            underlineColorAndroid="transparent"
            {...testProperties(labels.components.chatInput.inputAccessibilityLabel)}
          />
          <TouchableOpacity
            onPress={this.props.onPress}
            {...testProperties(labels.components.chatInput.sendAccessibilityLabel)}
          >
            <Icon
              name="ios-send"
              iconStyle={styles.chatIcons}
              type="ionicon"
            />
          </TouchableOpacity>
        </View>
        {this.renderKeyboardSpacer()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#fff',
    borderColor: '#afafaf',
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  input: {
    color: '#000',
    flex: 1,
    fontSize: 16,
    backgroundColor: '#fff',
    borderColor: '#afafaf',
    borderWidth: 1,
    borderRadius: 25,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 17,
    paddingRight: 17,
  },
  chatIcons: {
    color: '#1b73e3',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    marginTop: 5,
    fontSize: 28,
    width: 35,
  },
});

export { ChatInput };
