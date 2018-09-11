const config = require('./wdio.shared.conf').config;

const ANDROID_APP_PATH = './android/app/build/outputs/apk/app-debug.apk';
const deviceName = 'Nexus_5_7.1.1';
const platformName = 'Android';
const platformVersion = '7.1.1';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    app: ANDROID_APP_PATH,
    deviceName,
    maxInstances: 1,
    noReset: true,
    orientation: 'PORTRAIT',
    platformName,
    platformVersion,

    // Custom
    customCapabilities: {
      pixelRatio: 3,
    },
  },
];

// ====================
// Appium configuration
// ====================
config.appium = {
  args: {
    address: '127.0.0.1',
    commandTimeout: '11000',
    deviceName,
    platformName,
    platformVersion,
  },
};

config.cucumberOpts.tagExpression = `${config.cucumberOpts.tagExpression} and (not @ios)`;

config.port = 4723;

exports.config = config;
