import * as labels from '../../../app/config/labels';
import { TEST_PREFIX, SCREEN_SELECTORS } from '../support/constants';
import { tapOnButton } from '../support/utils';

const WEBVIEW_SELECTORS = {
  INPUT: `${TEST_PREFIX}${labels.webview.textAccessibilityLabel}`,
  BUTTON: `${TEST_PREFIX}${labels.webview.button}`,
};

/**
 * Select screen from the tabbar
 * @param {string} url A url like `www.wswebcreation.nl` or with `http(s)://` in front of it
 */
export function enterURL(url) {
  $(WEBVIEW_SELECTORS.INPUT).addValue(url.toLowerCase());
  tapOnButton(WEBVIEW_SELECTORS.BUTTON);
}

/**
 * Wait for the website in the webview to be loaded
 */
export function waitForWebsiteLoaded() {
  waitForWebviewContextLoaded();
  switchContext('webview');
  waitForDocumentFullyLoaded();
  switchContext('native');
}

/**
 * Wait for the webview context to be loaded
 */
function waitForWebviewContextLoaded() {
  device.waitUntil(
    () =>
      device.contexts().value.length > 1
      && device.contexts().value[1].toLowerCase().includes('webview'),
    10000,
    'Webview context not loaded',
    100
  );
}

/**
 * Switch to native or webview context
 * @param {string} context should be native of webview
 */
function switchContext(context) {
  device.context(device.contexts().value[context === 'webview' ? 1 : 0])
}

/**
 * Wait for the document to be full loaded
 */
function waitForDocumentFullyLoaded() {
  device.waitUntil(
    () => device.execute(() => document.readyState).value === 'complete',
    15000,
    'Website not loaded',
    100
  );
}


