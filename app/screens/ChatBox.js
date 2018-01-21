import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ListView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { api } from '../config/Api';
import { IS_IOS } from '../config/Constants';

let conversation;
const { height } = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
const defaultHeight = 30;


const EachMsg = (props) => {
  if (props.me === true) {
    return (
      <View style={styles.rightMessage}>
        <Text>{props.msg}</Text>
      </View>
    );
  }
  return (
    <View style={styles.leftMessage}>
      <Text>{props.msg}</Text>
    </View>
  );
};

class ChatBox extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const person = navigation.state.params.person;
    const headerLeft = (
      <View style={styles.leftHeaderContainer}>
        <Icon name="ios-arrow-back" iconStyle={styles.chatIcons} type="ionicon"
              onPress={() => navigation.goBack(null)}/>
        <Image source={{ uri: person.image }} style={styles.chatInitStyle}
               resizeMode='contain'/>
        <Text style={styles.nameText}>{`${person.firstName} ${person.lastName}`}</Text>
      </View>
    );
    return { headerLeft };
  };

  constructor(props) {
    super(props);
    conversation = this.props.navigation.state.params.person.conversation || [];
    this.state = {
      msg: '',
      me: true,
      datasource: ds.cloneWithRows(conversation),
      height: defaultHeight
    };
  }

  responses(){
    return api.getOnelinersResponse();
  }

  async send() {
    if (this.state.msg.length > 0) {
      const replies = await this.responses();
      const randomNumber = Math.floor(Math.random() * replies.length);
      conversation.unshift({
        me: false,
        msg: replies[randomNumber],
      }, {
        me: true,
        msg: this.state.msg
      });
      this.setState({
        datasource: ds.cloneWithRows(conversation),
        msg: ''
      });
    }
  }

  updateSize(autoHeight) {
    const maxInputHeight = 0.25 * height;
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
      <View style={styles.mainContainer}>
        <ListView
          initialListSize={5}
          contentContainerStyle={{ justifyContent: 'flex-end' }}
          style={{ flex: 1, }}
          dataSource={this.state.datasource}
          renderRow={rowData => <EachMsg {...rowData}/>}
          enableEmptySections
          noScroll
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>}
        />
        <View style={styles.footerContainer}>
          <TouchableOpacity>
            <Icon name="plus" iconStyle={styles.chatIcons} type="feather"/>
          </TouchableOpacity>
          <TextInput
            multiline={true}
            value={this.state.msg}
            placeholder="Type a message..."
            placeholderTextColor="#EDEDED"
            selectionColor="white"
            onChangeText={(msg) => this.setState({ msg })}
            style={[styles.input, newStyle]}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
            testID='test-chatField'
          />
          <TouchableOpacity
            onPress={() => this.send()}
            testID='test-send'
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

export default ChatBox;

const styles = StyleSheet.create({
  leftHeaderContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  chatInitStyle: {
    borderRadius: 16,
    width: 35,
    height: 35
  },
  nameText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingLeft: 7
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {},
  leftMessage: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 5,
    marginRight: 75,
    alignSelf: 'flex-start'
  },
  rightMessage: {
    backgroundColor: '#dbf8c6',
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 75,
    alignSelf: 'flex-end'
  },
  listItemContainer: {},
  footerContainer: {
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
