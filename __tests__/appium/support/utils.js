import {
  ANDROID_ACCEPT_ALERT_SELECTOR,
  ANDROID_ALERT_MESSAGE_SELECTOR,
  ANDROID_ALERT_TITLE_SELECTOR,
  ANDROID_TEXT_SELECTOR,
  IOS_ALERT_SELECTOR,
  IOS_TEXT_SELECTOR,
  SWIPE_DIRECTION,
} from './constants';

let SCREEN_SIZE;

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
export function swipeOnPercentage(from, to) {
  SCREEN_SIZE = SCREEN_SIZE || device.windowHandleSize().value;
  const pressOptions = getDeviceScreenCoordinates(SCREEN_SIZE, from);
  const moveToScreenCoordinates = getDeviceScreenCoordinates(SCREEN_SIZE, to);
  swipe(
    pressOptions,
    moveToScreenCoordinates,
  );
}

/**
 * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
 *
 * @param {object} from { x: 50, y: 50 }
 * @param {object} to { x: 25, y: 25 }
 *
 * @example
 * <pre>
 *   // This is a swipe to the left
 *   const from = { x: 50, y:50 }
 *   const to = { x: 25, y:50 }
 * </pre>
 */
export function swipe(from, to) {
  device.touchPerform([{
    action: 'press',
    options: from,
  }, {
    action: 'wait',
    options: { ms: 1000 },
  }, {
    action: 'moveTo',
    options: to,
  }, {
    action: 'release',
  }]);
  device.pause(1500);
}

/**
 * Swipe down based on a percentage
 * @param {float} percentage
 */
export function swipeDown(percentage = 1) {
  swipeOnPercentage(calculateXY(SWIPE_DIRECTION.down.start, percentage), calculateXY(SWIPE_DIRECTION.down.end, percentage));
}

/**
 * Swipe Up based on a percentage
 * @param {float} percentage from 0 - 1
 */
export function swipeUp(percentage = 1) {
  swipeOnPercentage(calculateXY(SWIPE_DIRECTION.up.start, percentage), calculateXY(SWIPE_DIRECTION.up.end, percentage));
}

/**
 * Swipe left based on a percentage
 * @param {float} percentage from 0 - 1
 */
export function swipeLeft(percentage = 1) {
  swipeOnPercentage(calculateXY(SWIPE_DIRECTION.left.start, percentage), calculateXY(SWIPE_DIRECTION.left.end, percentage));
}

/**
 * Swipe right based on a percentage
 * @param {float} percentage from 0 - 1
 */
export function swipeRight(percentage = 1) {
  swipeOnPercentage(calculateXY(SWIPE_DIRECTION.right.start, percentage), calculateXY(SWIPE_DIRECTION.right.end, percentage));
}

/**
 * Calculate the x y coordinates based on a percentage
 * @param {object} coordinates
 * @param {float} percentage
 * @return {{x: number, y: number}}
 */
function calculateXY({x, y}, percentage) {
  return {
    x: x * percentage,
    y: y * percentage,
  };
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
export function tapOnScreen(location = {x: 50, y: 25}) {
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
  const alertText = device.isAndroid
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
