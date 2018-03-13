import { AppRegistry } from 'react-native';
import App from './App';
import { setupAutomation } from './app/config/TestProperties';

setupAutomation();

AppRegistry.registerComponent('wswebcreation', () => App);
