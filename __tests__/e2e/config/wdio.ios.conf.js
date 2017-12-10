const config = require('./wdio.shared.conf').config;
const argv = require('yargs').argv;

const deviceName = argv.iphone ? argv.iphone.replace(/"+/g, '') : 'iPhone 6';
const platformVersion = argv.os ? argv.os : '11.1';
const IOS_APP_PATH = './ios/build/Build/Products/Debug-iphonesimulator/wswebcreation.app';

// ============
// Capabilities
// ============
config.capabilities = [
  {
    platformName: 'iOS',
    platformVersion,
    deviceName,
    orientation: 'PORTRAIT',
    app: IOS_APP_PATH,
    noReset: true,
    maxInstances: 1,
    automationName: 'XCUITest',
  },
];

config.appium = {
  args: {
    address: '127.0.0.1',
    commandTimeout: '11000',
    platformVersion,
    platformName: 'iOS',
    deviceName,
    automationName: 'XCUITest',
  },
};

config.port = 4723;

exports.config = config;
