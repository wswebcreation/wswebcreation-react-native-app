import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import { ChatInput } from '../components/ChatInput';
import { MessageBubble } from '../components/MessageBubble';
import { api } from '../config/Api';

let conversation;
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
const defaultHeight = 30;

class ChatBox extends React.Component {
  constructor(props) {
    super(props);
    conversation = this.props.navigation.state.params.person.conversation || [];
    this.state = {
      message: '',
      placeRight: true,
      datasource: ds.cloneWithRows(conversation),
      height: defaultHeight
    };
  }

  static navigationOptions ({ navigation }) {
    const person = navigation.state.params.person;
    const headerLeft = (
      <View style={styles.leftHeaderContainer}>
        <Icon
          name="ios-arrow-back"
          iconStyle={styles.chatIcons}
          type="ionicon"
          onPress={() => navigation.goBack(null)}
        />
        <Image
          source={{ uri: person.image }}
          style={styles.chatInitStyle}
          resizeMode='contain'
        />
        <Text style={styles.nameText}>
          {`${person.firstName} ${person.lastName}`}
        </Text>
      </View>
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
      <View style={styles.mainContainer}>
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
});
