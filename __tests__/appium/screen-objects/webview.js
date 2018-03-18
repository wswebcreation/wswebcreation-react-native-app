import * as labels from '../../../app/config/labels';
import {
  TEST_PREFIX,
  WAIT_FOR_STATE,
  CONTEXT_REF,
  DOCUMENT_READY_STATE
} from '../support/constants';
import {
  acceptAlert,
  getAlertText,
  swipe,
  tapOnButton,
  waitFor,
  waitForAlert
} from '../support/utils';

const WEBVIEW_SELECTORS = {
  INPUT: `${TEST_PREFIX}${labels.webview.textAccessibilityLabel}`,
  BUTTON: `${TEST_PREFIX}${labels.webview.button}`,
  LOADER: `${TEST_PREFIX}${labels.webview.loadingText}`,
  MENU: {
    ANDROID: '~MENU Click to view the navigation',
    IOS: '~MENU',
  },
  CSS: {
    MENU: {
      BUTTON: '.menu',
      TESTAUTOMATION_MENU_ITEM: 'a*=testautomation',

    },
    TESTAUTOMATION_CATEGORY_TITLE: 'h4*=testautomation'
  }
};

/**
 * Select screen from the tabbar
 * @param {string} url A url like `www.wswebcreation.nl` or with `http(s)://` in front of it
 */
export function enterURL(url) {
  $(WEBVIEW_SELECTORS.INPUT).addValue(url.toLowerCase());
  tapOnButton(WEBVIEW_SELECTORS.BUTTON);
  waitFor({
    falseState: true,
    selector: WEBVIEW_SELECTORS.LOADER,
    state: WAIT_FOR_STATE.EXIST,
  })
}

/**
 * Wait for the website in the webview to be loaded
 */
export function waitForWebsiteLoaded() {
  waitForWebviewContextLoaded();
  switchToContext(CONTEXT_REF.WEBVIEW);
  waitForDocumentFullyLoaded();
  switchToContext(CONTEXT_REF.NATIVE);
}

/**
 * Switch to native or webview context
 * @param {string} context should be native of webview
 */
export function switchToContext(context) {
  let index = context === CONTEXT_REF.WEBVIEW ? 1 : 0;
  if (context === CONTEXT_REF.WEBVIEW && getCurrentContexts().length > 2 && device.isIOS) {
    index = getCurrentContexts().findIndex(context => context.includes('.2'));
  }
  device.context(getCurrentContexts()[index]);
}

/**
 * Return the current context
 * @return {string} The current context
 */
export function getCurrentContext() {
  return device.context();
}

/**
 * Returns an object with the list of all available contexts
 * @return {object} An object containing the list of all available contexts
 */
export function getCurrentContexts() {
  return device.contexts().value;
}


/**
 * Validate if native webview can be scrolled
 */
export function validateCanNativelyScrollWebview() {
  const selector = WEBVIEW_SELECTORS.MENU[device.isIOS ? 'IOS' : 'ANDROID'];
  const centerOfScreen = { x: 50, y: 65 };
  const topOfScreen = { x: 50, y: 1 };
  const initialLocation = device.getLocation(selector);
  swipe(centerOfScreen, topOfScreen);
  const newLocation = device.getLocation(selector);
  expect(initialLocation)
    .to
    .not
    .deep
    .equal(newLocation, 'Webview could not be scrolled');
}

/**
 * Validate if webview can be scrolled with JS
 */
export function validateCanScrollWebviewWithJavascript() {
  const initialLocation = device.execute(() => document.querySelector('.menu').getBoundingClientRect());
  device.execute(() => window.scrollTo(0, 500));
  const newLocation = device.execute(() => document.querySelector('.menu').getBoundingClientRect());
  expect(initialLocation)
    .to
    .not
    .deep
    .equal(newLocation, 'Webview could not be scrolled with JS');
}

/**
 * Open the menu with "plain" CSS selectors
 */
export function openTestautomationCategory() {
  categoryTestautomationIsShown(false);
  $(WEBVIEW_SELECTORS.CSS.MENU.BUTTON).click();
  waitFor({
    selector: WEBVIEW_SELECTORS.CSS.MENU.TESTAUTOMATION_MENU_ITEM,
    state: WAIT_FOR_STATE.VISIBLE,
  });
  $(WEBVIEW_SELECTORS.CSS.MENU.TESTAUTOMATION_MENU_ITEM).click();

}

/**
 * Expect the testautomation category to be shown or not
 * @param {boolean} isShown, default false
 */
export function categoryTestautomationIsShown(isShown = true) {
  waitFor({
    falseState: !isShown,
    selector: WEBVIEW_SELECTORS.CSS.TESTAUTOMATION_CATEGORY_TITLE,
    state: WAIT_FOR_STATE.VISIBLE,
  });
}

/**
 * Wait for the webview context to be loaded
 */
export function waitForWebviewContextLoaded() {
  device.waitUntil(
    () =>
      getCurrentContexts().length > 1
      && getCurrentContexts()[1].toLowerCase().includes(CONTEXT_REF.WEBVIEW),
    10000,
    'Webview context not loaded',
    100
  );
}

/**
 * Wait for the document to be full loaded
 */
export function waitForDocumentFullyLoaded() {
  device.pause(1000);
  device.waitUntil(
    () => device.execute(() => document.readyState).value === DOCUMENT_READY_STATE.COMPLETE,
    15000,
    'Website not loaded',
    100
  );
}

/**
 * Check if the alert is shown
 * @param {string} url
 */
export function validateAlertIsShown(url) {
  waitForAlert();
  expect(getAlertText())
    .to
    .have
    .string(`Alert http://${url} is not a valid url!`);
  acceptAlert();
}
