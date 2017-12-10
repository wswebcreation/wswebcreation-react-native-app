import React, { Component } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink'

const { height } = Dimensions.get('window');

export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={[styles.headerBorder, styles.header]}>
            WSWEBCREATION
          </Text>
        </View>
        <Text style={styles.defaultFont}>
          Hi there, welcome to my demo app.
        </Text>
        <Text style={styles.defaultFont}>
          This app is build with React Native and will be used by myself for test (automation)
          purposes and contains 3 TABS:{'\n'}
          - This homepage{'\n'}
          - A Webview{'\n'}
          - A Chats
        </Text>
        <Text style={[styles.header, styles.headerMargin]}>WEBVIEW</Text>
        <Text style={styles.defaultFont}>
          In the Webview you can enter an URL and load it in the Webview
        </Text>
        <Text style={[styles.header, styles.headerMargin]}>CHATS</Text>
        <Hyperlink linkDefault={true} linkStyle={ { color: '#2980b9'} }>
          <Text style={styles.defaultFont}>
            In the chats I created multiple API calls to retrieve JSON data from
            https://gist.github.com/wswebcreation.{'\n'}
            When you select a chat you will get a chatbox. Here you can add chats and you will get a
            response (some movie onliners) from my gist.
          </Text>
          <Text style={[styles.header, styles.headerMargin]}>CREDITS</Text>
          <Text style={styles.defaultFont}>
            I'd like to thank https://medium.com/@yllongboy for his clear article about creating a
            "WhatsApp Layout through React Native".{'\n'}
            I'd also like to thank https://randomuser.me/ for generating random users with avatars.
          </Text>
          <Text style={[styles.header, styles.headerMargin]}>QUESTION?</Text>
          <Text style={styles.defaultFont}>
            If you have questions feel free to ask them om my GitHub
            (https://github.com/wswebcreation) or through my site (http://www.wswebcreation.nl/)
          </Text>
          <Text style={styles.defaultFont}>
            {'\n'}
            {'\n'}
            Grtz,
            {'\n'}
            {'\n'}
            Wim Selles{'\n'}
            wswebcreation
          </Text>
        </Hyperlink>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0.10 * height,
    paddingTop: 0.20 * height,
  },
  headerBorder: {
    borderColor: '#000',
    borderWidth: 3,
    paddingBottom: 9,
    paddingLeft: 13,
    paddingRight: 13,
    paddingTop: 9,
    textAlign: 'center'
  },
  header: {
    fontFamily: 'Roboto Mono',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerMargin: {
    marginBottom: 10,
    marginTop: 15,
  },
  defaultFont: {
    fontFamily: 'Roboto Mono',
    fontSize: 16,
    padding: 5,
  }
});