import React from 'react';
import { Platform, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../screens/Home';
import WebViewScreen from '../screens/Webview';
import Chats from '../screens/Chats';
import ChatBox from '../screens/ChatBox';
import WebViewSelection from '../screens/WebviewSelection';
import { testProperties } from './TestProperties';
import * as labels from './labels.json';

const Tabs = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.home,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.home)}>
            <Icon
              name="ios-home-outline"
              type="ionicon"
              size={25}
              color={tintColor}
            />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.home),
        },
      },
    },
    Webview: {
      screen: WebViewSelection,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.webview,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.webview)}>
            <Icon
              name="ios-globe-outline"
              type="ionicon"
              size={25}
              color={tintColor}
            />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.webview),
        },
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarLabel: labels.tabNavigator.chats,
        tabBarIcon: ({ tintColor }) =>
          <View {...testProperties(labels.tabNavigator.chats)}>
          <Icon
            name="ios-chatbubbles-outline"
            type="ionicon"
            size={25}
            color={tintColor}
          />
          </View>,
        tabBarTestIDProps: {
          ...testProperties(labels.tabNavigator.chats),
        },
      },
    },
  },
  {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#2980b9',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: '#ffffff',
        ...Platform.select({
          android: {
            height: 60,
          },
        }),
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
    }
  }
);

export const StackMainNavigation = StackNavigator({
  Root: {
    screen: Tabs,
  },
  ChatBox: {
    screen: ChatBox,
  },
  WebViewScreen: {
    screen: WebViewScreen,
  },
}, {
  navigationOptions: {
    headerTitleStyle: {
      alignSelf: 'center',
      color: '#000',
      textAlign: 'center',
    },
  }
});
