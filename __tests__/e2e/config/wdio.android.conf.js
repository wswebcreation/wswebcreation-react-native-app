const config = require('./wdio.shared.conf').config;

const ANDROID_APP_PATH = './android/app/build/outputs/apk/app-debug.apk';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    platformName: 'Android',
    platformVersion: '7.1.1',
    deviceName: 'Nexus_5_7.1.1',
    orientation: 'PORTRAIT',
    app: ANDROID_APP_PATH,
    noReset: true,
    maxInstances: 1,
  },
];

// ====================
// Appium configuration
// ====================
config.appium = {
  args: {
    address: '127.0.0.1',
    commandTimeout: '11000',
    platformVersion: '7.1.1',
    platformName: 'Android',
    deviceName: 'Nexus 5X API 25',
  },
};

config.port = 4723;

exports.config = config;