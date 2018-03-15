import { getStorybookUI, configure } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

// to set manually use, e.g. host: 'localhost' option
const StorybookInApp = getStorybookUI({ port: 8081, onDeviceUI: true });

export default StorybookInApp;
