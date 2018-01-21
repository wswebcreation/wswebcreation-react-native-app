import React from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  Image,
  View, TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { api } from '../config/Api';
import ChatBox from './ChatBox';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 })

export default class Chats extends React.Component {
  static navigationOptions = {
    title: 'Chats',
  };

  constructor(props) {
    super(props)
    this.state = {
      peopleDataSource: ds.cloneWithRows([]),
      loaded: false
    }
  }

  render() {
    if (this.state.loaded) {
      return (
        <ListView
          initialListSize={5}
          enableEmptySections={true}
          dataSource={this.state.peopleDataSource}
          renderRow={(person) => {
            return this.renderPersonRow(person)
          }}/>
      )
    } else {
      return (<Text onPress={() => {
        this.props.navigator.push({ id: 'chatbox' })
      }}>Retrieving Chats...</Text>)
    }
  }

  renderPersonRow(person) {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('ChatBox', { person })
        }}
        testID={`test-${person.firstName} ${person.lastName}`}
      >
        <View style={styles.listItemContainer}>
          <View style={styles.iconContainer}>
            <Image source={{ uri: person.image }} style={styles.initStyle} resizeMode='contain'/>
          </View>
          <View style={styles.callerDetailsContainer}>
            <View style={styles.callerDetailsContainerWrap}>
              <View style={styles.nameContainer}>
                <Text
                  style={{ fontWeight: 'bold' }}>{`${person.firstName} ${person.lastName}`}</Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={{ fontSize: 11 }}>{person.time}</Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              <Icon name="done-all" color={person.read ? '#075e54' : '#777'} size={15}
                    style={{ padding: 0 }}/>
              <Text numberOfLines={1}
                    style={{ flex: 1, fontSize: 12, color: '#777' }}>{person.lastMessage}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    api.getChatHistory()
      .then((data) => {
        this.setState({
          peopleDataSource: ds.cloneWithRows(data),
          loaded: true
        })
      });
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
