export const SCREENSHOTS_FOLDERS = {
  TMP: '.tmp/screenshots/',
  DIST: '.dist/screenshots/',
};
export const SWIPE_DIRECTION = {
  down: {
    start: { x: 50, y: 15 },
    end: { x: 50, y: 85 },
  },
  left: {
    start: { x: 85, y: 30 },
    end: { x: 25, y: 30 },
  },
  right: {
    start: { x: 25, y: 30 },
    end: { x: 85, y: 30 },
  },
  up: {
    start: { x: 50, y: 85 },
    end: { x: 50, y: 15 },
  },
};
export const CONTEXT_REF = {
  NATIVE: 'native',
  WEBVIEW: 'webview',
};
export const DOCUMENT_READY_STATE = {
  COMPLETE: 'complete',
  INTERACTIVE: 'interactive',
  LOADING: 'loading',
};
export const TEST_PREFIX = '~test-';
export const NATIVE_APP = 'NATIVE_APP';
export const WAIT_FOR_STATE = {
  EXIST: 'exist',
  VISIBLE: 'visible',
};
export const INCORRECT_URL = 'in.correct.url';

/**
 * Cross-platform Text selectors
 */
export const ANDROID_TEXT_SELECTOR = '*//android.widget.TextView';
export const ANDROID_ALERT_TITLE_SELECTOR = '*//android.widget.TextView[@resource-id="android:id/alertTitle"]';
export const ANDROID_ALERT_MESSAGE_SELECTOR = '*//android.widget.TextView[@resource-id="android:id/message"]';
export const ANDROID_ACCEPT_ALERT_SELECTOR = '*//android.widget.Button[@text="OK"]';
export const IOS_ALERT_SELECTOR = '*//XCUIElementTypeAlert';
export const IOS_TEXT_SELECTOR = null;
