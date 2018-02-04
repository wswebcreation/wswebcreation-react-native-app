export const SCREENSHOTS_DIST_FOLDER = '.dist/screenshots/';
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
export const TEST_PREFIX = '~test-';

/**
 * Cross-platform Text selectors
 */
export const ANDROID_TEXT_SELECTOR = '*//android.widget.TextView';
export const IOS_TEXT_SELECTOR = null;
