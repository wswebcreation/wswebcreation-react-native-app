import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  ListView,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { ChatInput } from '../components/ChatInput';
import { MessageBubble } from '../components/MessageBubble';
import { CustomHeader } from '../components/CustomHeader';
import { api } from '../config/Api';
import * as labels from '../config/labels';
import { testProperties } from '../config/TestProperties';

let conversation;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
const defaultHeight = 30;
const deepLinkUser = {
  'firstName': 'Dick',
  'lastName': 'Tracy',
  'conversation': [
    {
      'placeRight': true,
      'message': 'So it seems like this internet thing is here to stay, huh?'
    },
    {
      'placeRight': false,
      'message': 'Hey wassup?'
    }
  ],
  'read': true,
  'lastMessage': 'So it seems like this internet thing is here to stay, huh?',
  'date': '09-Dec-2017',
  'time': '1:33 PM',
  'image': 'https://randomuser.me/api/portraits/men/3.jpg'
};

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    conversation = this.props.navigation.state.params.person.conversation || deepLinkUser.conversation;
    this.state = {
      message: '',
      placeRight: true,
      datasource: ds.cloneWithRows(conversation),
      height: defaultHeight
    };
  }

  static navigationOptions({ navigation }) {
    const person = typeof navigation.state.params.person === 'string' ? deepLinkUser : navigation.state.params.person;
    const headerLeft = (
      <CustomHeader
        onPress={() => navigation.goBack(null)}
        image={
          <Image
            source={{ uri: person.image }}
            style={styles.chatInitStyle}
            resizeMode='contain'
          />}
        text={`${person.firstName} ${person.lastName}`}
      />
    );
    return { headerLeft };
  };

  responses() {
    return api.getOneLinersResponse();
  }

  async send() {
    if (this.state.message.length > 0) {
      const replies = await this.responses();
      const randomNumber = Math.floor(Math.random() * replies.length);
      conversation.unshift({
        placeRight: false,
        message: replies[randomNumber],
      }, {
        placeRight: true,
        message: this.state.message
      });
      this.setState({
        datasource: ds.cloneWithRows(conversation),
        message: ''
      });
    }
  }

  render() {
    return (
      <View
        style={styles.mainContainer}
        {...testProperties(labels.stackNavigatorTitle.chatBox)}
      >
        <ListView
          initialListSize={5}
          contentContainerStyle={{ justifyContent: 'flex-end' }}
          style={{ flex: 1, }}
          dataSource={this.state.datasource}
          renderRow={rowData => (
            <MessageBubble
              placeRight={rowData.placeRight}
              message={rowData.message}
            />)}
          enableEmptySections
          noScroll
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted/>}
        />
        <ChatInput
          onChangeText={(message) => this.setState({ message })}
          onPress={() => this.send()}
          value={this.state.message}
        />
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
