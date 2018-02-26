import { ensureDirSync } from 'fs-extra';
import { resolve } from 'path';
import {
  ANDROID_ACCEPT_ALERT_SELECTOR,
  ANDROID_ALERT_MESSAGE_SELECTOR,
  ANDROID_ALERT_TITLE_SELECTOR,
  ANDROID_TEXT_SELECTOR,
  IOS_ALERT_SELECTOR,
  IOS_TEXT_SELECTOR,
  SWIPE_DIRECTION
} from './constants';

/**
 * The app is opened by Appium by default, when we start a new scenario
 * the app needs to be restarted
 */
export function launchApp() {
  if (!device.options.firstAppStart) {
    restartApp();
  }
  device.options.firstAppStart = false;
}

/**
 * Restart the app, restarting is done with a reset of the app status to start with a clean phase
 */
export function restartApp() {
  device.reset();
}

/**
 * Wait for a given element to be|not visible|exist
 * REMARK: if falseState = true it instead waits for the selector to not match any elements
 * @param {Object} data
 * @example
 * <pre>
 *   const data = {
 *     selector: '~test-Ja',
 *     milliseconds: 3000,
 *     falseState: false,
 *     state: 'visible|exist'
 *   }
 * </pre>
 */
export function waitFor(data) {
  Object.assign({
    state: 'exist',
    falseState: false,
    milliseconds: 11000,
  }, data);
  device[`waitFor${upperFirst(data.state)}`](
    data.selector,
    data.milliseconds,
    data.falseState,
  );
}

/**
 * Tap on a button
 * @param {string} element
 */
export function tapOnButton(element) {
  device.touchAction(element, 'tap');
}

/**
 * Converts the first character of string to upper case
 * @param {string} string
 * @returns Returns the converted string
 */
export function upperFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
 * percentages of the screen.
 * @param {object} from { x: 50, y: 50 }
 * @param {object} to { x: 25, y: 25 }
 * @example
 * <pre>
 *   // This is a swipe to the left
 *   const from = { x: 50, y:50 }
 *   const to = { x: 25, y:50 }
 * </pre>
 */
export function swipe(from, to) {
  const screenSize = device.windowHandleSize().value;
  const pressOptions = getDeviceScreenCoordinates(screenSize, from);
  const moveToScreenCoordinates = getDeviceScreenCoordinates(screenSize, to);

  device.touchPerform([{
    action: 'press',
    options: pressOptions,
  }, {
    action: 'moveTo',
    options: {
      x: moveToScreenCoordinates.x - pressOptions.x,
      y: moveToScreenCoordinates.y - pressOptions.y
    },
  }, {
    action: 'release',
  }]);
  device.pause(1000);
}

/**
 * Swipe down
 */
export function swipeDown() {
  swipe(SWIPE_DIRECTION.down.start, SWIPE_DIRECTION.down.end);
}

/**
 * Swipe Up
 */
export function swipeUp() {
  swipe(SWIPE_DIRECTION.up.start, SWIPE_DIRECTION.up.end);
}

/**
 * Swipe left
 */
export function swipeLeft() {
  swipe(SWIPE_DIRECTION.left.start, SWIPE_DIRECTION.left.end);
}

/**
 * Swipe right
 */
export function swipeRight() {
  swipe(SWIPE_DIRECTION.right.start, SWIPE_DIRECTION.right.end);
}

/**
 * Get the screen coordinates based on a device his screensize
 * @param {number} screenSize the size of the screen
 * @param {object} coordinates like { x: 50, y: 50 }
 * @return {{x: number, y: number}}
 */
function getDeviceScreenCoordinates(screenSize, coordinates) {
  return {
    x: Math.round(screenSize.width * (coordinates.x / 100)),
    y: Math.round(screenSize.height * (coordinates.y / 100)),
  };
}

/**
 * Tap on a given location (coordinates) on the screen. The given coordinates are
 * percentages of the screen.
 * @param {object} location { x: 50, y: 25 }
 */
export function tapOnScreen(location = { x: 50, y: 25 }) {
  const screenSize = device.windowHandleSize().value;

  device.touchPerform([{
    action: 'press',
    options: getDeviceScreenCoordinates(screenSize, location),
  }, {
    action: 'release',
  }]);
}

/**
 * Get the text of an element
 * @param element
 * @return {string}
 */
export function getTextOfElement(element) {
  const visualText = element.getText(device.isAndroid ? ANDROID_TEXT_SELECTOR : IOS_TEXT_SELECTOR);
  return typeof visualText === 'object' ? visualText.join(' ') : visualText;
}

/**
 * Accept the alert text on a cross-platform way
 */
export function acceptAlert() {
  return device.isAndroid ? tapOnButton(ANDROID_ACCEPT_ALERT_SELECTOR) : device.alertAccept();
}

/**
 * Get the alert text on a cross-platform way
 * @return {string}
 */
export function getAlertText() {
  const alertText =  device.isAndroid
    ? `${$(ANDROID_ALERT_TITLE_SELECTOR).getText()} ${$(ANDROID_ALERT_MESSAGE_SELECTOR).getText()}`
    : device.alertText();
  return alertText.replace('\n', ' ');
}

/**
 * Wait for the alert to exist
 */
export function waitForAlert() {
  waitFor({
    selector: device.isAndroid ? ANDROID_ALERT_TITLE_SELECTOR : IOS_ALERT_SELECTOR,
    state: 'exist',
  });
}
