const fs = require('fs-extra');
const argv = require('yargs').argv;

const report = require('multiple-cucumber-html-reporter');
const chai = require('chai');

exports.config = {
  // ====================
  // Appium configuration
  // ====================
  services: ['appium'],

  // ==================
  // Test Configuration
  // ==================
  sync: true,
  logLevel: argv.logLevel || 'silent',
  coloredLogs: true,
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  // ======================
  // Cucumber configuration
  // ======================
  framework: 'cucumber',
  specs: getFeatureFiles(),
  cucumberOpts: {
    require: [
      '__tests__/appium/config/helpers/after.scenario.js',
      '__tests__/appium/config/helpers/report.hook.js',
      '__tests__/appium/step_definitions/base.steps.js',
      '__tests__/appium/step_definitions/navigation.steps.js',
      '__tests__/appium/step_definitions/webview.steps.js',
      '__tests__/appium/step_definitions/chat.steps.js',
    ],
    backtrace: false,
    compiler: ['js:babel-register'],
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    tagExpression: '(not @wip)',
    timeout: 60000,
    ignoreUndefinedDefinitions: false,
  },
  reporters: ['spec'],

  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to
  // enhance it and to build services around it. You can either apply a single function or an array
  // of methods to it. If one of them returns with a promise, WebdriverIO will wait until that
  // promise got resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   */
  onPrepare: () => {
    console.log(`
=================================================================================
    The '.tmp'-folder is being removed. This is the folder that holds all the 
    reports and failure screenshots.
=================================================================================\n`);
    fs.emptyDirSync('.tmp/');
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`.
   */
  before: () => {
    /**
     * Setup the Chai assertion framework
     */
    global.expect = chai.expect;
    global.assert = chai.assert;
    global.should = chai.should();

    /**
     * Rename the browser to device to prevent confusion
     */
    global.device = browser;

    /**
     * Custom property that is used to determine if the app is already launched for the first time
     */
    device.options.firstAppStart = true;

    /**
     * Custom property that is used to determine if the app needs to be restarted
     */
    device.options.restartApp = false;
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   */
  onComplete: () => {
    report.generate({
      jsonDir: '.tmp/json-output/',
      reportPath: '.tmp/report/',
    });
  },
};

/**
 * Get the featurefiles that need to be run based on an command line flag that is passed,
 * if nothing is passed all the featurefiles are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
 *     npm run appium.io -- --feature=playground
 *
 *     // For multiple features
 *     npm run appium.io -- --feature=playground,login,...
 *
 *     // Else
 *     npm run appium.ios
 * </pre>
 */
function getFeatureFiles() {
  if (argv.feature) {
    return argv.feature.split(',')
      .map(feature => `${process.cwd()}/__tests__/appium/**/${feature}.feature`);
  }

  return [`${process.cwd()}/__tests__/appium/**/*.feature`];
}
