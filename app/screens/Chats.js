import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  Image,
  View, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BorderText } from '../components/BorderText';
import { api } from '../config/Api';
import { testProperties } from '../config/TestProperties';
import ChatBox from './ChatBox';
import * as labels from '../config/labels.json';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })

export default class Chats extends React.Component {
  static navigationOptions = {
    title: labels.stackNavigatorTitle.chats,
  };

  constructor(props) {
    super(props);
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }

  renderChatsOverview = () => (
    <View
      {...testProperties(labels.chats.window)}
    >
      <ListView
        initialListSize={5}
        enableEmptySections={true}
        dataSource={this.state.peopleDataSource}
        renderRow={(person) => this.renderPersonRow(person)}
      />
    </View>
  );

  renderRetrievingChatsContainer = () => (
    <View style={styles.loaderContainer}>
      <BorderText
        text={labels.chats.loadingText}
      />
    </View>
  );

  render() {
    return this.state.loaded ? this.renderChatsOverview() : this.renderRetrievingChatsContainer();
  }

  renderPersonRow(person) {
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('ChatBox', { person })}
        {...testProperties(`${person.firstName} ${person.lastName}`)}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={{ uri: person.image }}
              style={styles.initStyle}
              resizeMode='contain'
            />
          </View>
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text style={{ fontWeight: 'bold' }}>
                  {`${person.firstName} ${person.lastName}`}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{ fontSize: 11 }}>{person.time}</Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Icon
                name="done-all"
                color={person.read ? '#075e54' : '#777'}
                size={15}
                style={{ padding: 0 }}
              />
              <Text
                numberOfLines={1}
                style={{ flex: 1, fontSize: 12, color: '#777' }}>
                {person.lastMessage}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  async componentDidMount() {
    const chats = await api.getChatHistory();
    this.setState({
      peopleDataSource: ds.cloneWithRows(chats),
      loaded: true
    })
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  loaderContainer: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: 'center',
    borderBottomColor: 'rgba(92,94,94,0.5)',
    borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  nameContainer: {
    alignItems: 'flex-start',
    flex: 1
  },
  dateContainer: {
    alignItems: 'flex-end'
  },
  messageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  },
});
