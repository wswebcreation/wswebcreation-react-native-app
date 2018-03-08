import * as labels from '../../app/config/labels';
import { TEST_PREFIX } from '../support/constants';

const WEBVIEW_SELECTORS = {
  INPUT: `${TEST_PREFIX}${labels.webview.textAccessibilityLabel}`,
  BUTTON: `${TEST_PREFIX}${labels.webview.button}`,
};

/**
 * Enter url to load in webview
 *
 * @param {string} url A url like `www.wswebcreation.nl` or with `http(s)://` in front of it
 */
export async function enterURL(url) {
  await element(by.id(WEBVIEW_SELECTORS.INPUT)).replaceText(url.toLowerCase());
  await element(by.id(WEBVIEW_SELECTORS.BUTTON)).tap();
}
