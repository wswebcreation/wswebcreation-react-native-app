# wswebcreation-react-native-app

[![Join the chat at https://gitter.im/wswebcreation](https://badges.gitter.im/wswebcreation.svg)](https://gitter.im/wswebcreation) [![BuddyBuild](https://dashboard.buddybuild.com/api/statusImage?appID=5a2d24c66d0afd0001af256f&branch=master&build=latest)](https://dashboard.buddybuild.com/apps/5a2d24c66d0afd0001af256f/build/latest?branch=master)

An app which is build with React Native and will be used for test (automation) purposes.


![wswebcreation.app](./assets/wswebcreation-site.gif)

## About
As mentioned above I want to use this app to explore the possibilities for testing a (React) Native app (iOS / Android).
In order to understand what I need to test I told myself that I needed to be able to build a React Native app, so here it is :-) This app has three tabs that all do something different. More info will follow in the coming months. You can also follow my progress on my [site / blog](http://www.wswebcreation.nl/)

### Home
This is the intro of the app

### Webview
In the Webview you can enter an URL and load it in the Webview

### Chats
In the chats I created multiple API calls to retrieve JSON data from [GitHubGist](https://gist.github.com/wswebcreation). When you select a chat you will get a chatbox. Here you can add chats and you will get a response (some movie onliners) from my gist.

## Install
This will only work on a MAC so get started execute the following steps:

1. Clone the project: `git clone https://github.com/wswebcreation/wswebcreation-react-native-app.git`
2. Go to the folder: `cd wswebcreation-react-native-app`
3. Install all (dev)dependencies: `npm install`
4. Start the project: `react-native run-ios`
5. Happy playing!

## TODO
- [x] Create an iOS app
- [x] Hookup to [buddybuild](https://www.buddybuild.com/) to be able to create an iOS app
- [ ] Add an APP icon
- [ ] Create an Android app
- [ ] Add UT's with Jest and Enzyme
- [ ] Refactor code
- [ ] Add Appium tests
- [ ] Add Detox tests
- [ ] Implement different environments / build types
- [ ] Create a pipeline with [buddybuild](https://www.buddybuild.com/) and connect it to a cloudprovider to test on real devices / simulators / emulators

## Contributing
If you'd like to contribute feel free to create a PR. If you have some code feedback you may also add a PR or contact me through [Gitter](https://gitter.im/wswebcreation)

## Credits
- I'd like to thank [yllongboy](https://medium.com/@yllongboy) for his clear article about creating a "WhatsApp Layout through React Native".
- I'd also like to thank [randomuser.me](https://randomuser.me/) for generating random users with avatars.