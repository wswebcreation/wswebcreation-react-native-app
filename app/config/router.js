import React from 'react';
import { Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Home from '../screens/Home';
import WebViewScreen from '../screens/Webview';
import Chats from '../screens/Chats';
import ChatBox from '../screens/ChatBox';
import WebViewSelection from '../screens/WebviewSelection';

const Tabs = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) =>
          <Icon
            name="ios-home-outline"
            type="ionicon"
            size={25}
            color={tintColor}
          />
      },
    },
    Webview: {
      screen: WebViewSelection,
      navigationOptions: {
        tabBarLabel: 'Webview',
        tabBarIcon: ({ tintColor }) =>
          <Icon
            name="ios-globe-outline"
            type="ionicon"
            size={25}
            color={tintColor}
          />
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarLabel: 'Chats',
        tabBarIcon: ({ tintColor }) =>
          <Icon
            name="ios-chatbubbles-outline"
            type="ionicon"
            size={25}
            color={tintColor}
          />
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
