import React, { Component } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import { BorderText } from '../components/BorderText';
import * as labels from '../config/labels.json';
import { testProperties } from '../config/TestProperties';

const { height } = Dimensions.get('window');

export default class Home extends Component {
  static navigationOptions = {
    title: labels.stackNavigatorTitle.home,
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        {...testProperties(labels.stackNavigatorTitle.home)}
      >
        <View style={styles.headerContainer}>
          <BorderText
            text="wswebcreation"
          />
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
        <Hyperlink linkDefault linkStyle={styles.linkStyle}>
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
  header: {
    color: '#000',
    fontFamily: 'RobotoMono-Bold',
    fontSize: 20,
  },
  headerMargin: {
    marginBottom: 10,
    marginTop: 15,
  },
  defaultFont: {
    color: '#000',
    fontFamily: 'RobotoMono-Regular',
    fontSize: 16,
    padding: 5,
  },
  linkStyle: {
    color: '#2980b9',
  },
});
