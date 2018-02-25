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
    start: { x: 95, y: 50 },
    end: { x: 15, y: 50 },
  },
  right: {
    start: { x: 5, y: 50 },
    end: { x: 95, y: 50 },
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

/**
 * Cross-platform Text selectors
 */
export const ANDROID_TEXT_SELECTOR = '*//android.widget.TextView';
export const IOS_TEXT_SELECTOR = null;
