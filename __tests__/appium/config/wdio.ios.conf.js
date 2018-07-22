const config = require('./wdio.shared.conf').config;

const IOS_APP_PATH = './ios/build/Build/Products/Debug-iphonesimulator/wswebcreation.app';
const deviceName = 'iPhone 8';
const platformName = 'iOS';
const platformVersion = '11.4';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    app: IOS_APP_PATH,
    deviceName,
    maxInstances: 1,
    noReset: true,
    orientation: 'PORTRAIT',
    platformName,
    platformVersion,
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

config.cucumberOpts.tagExpression = `${config.cucumberOpts.tagExpression} and (not @android)`;

config.port = 4723;

exports.config = config;
