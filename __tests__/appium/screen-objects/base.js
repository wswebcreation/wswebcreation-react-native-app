import * as labels from '../../../app/config/labels';
import { TEST_PREFIX } from '../support/constants';
import { waitFor } from '../support/utils';

const SCREEN_SELECTORS = {
  home: `${TEST_PREFIX}${labels.stackNavigatorTitle.home}`,
  webview: `${TEST_PREFIX}${labels.stackNavigatorTitle.webview}`,
  chats: `${TEST_PREFIX}${labels.stackNavigatorTitle.chats}`,
};

/**
 * Wait for a specific screen to be visible
 * @param {string} screen see the 'SCREEN_SELECTORS' const in './constants.js' for all the
 * possible values
 */
export function waitForScreenToBeVisible(screen) {
  waitFor({
    selector: SCREEN_SELECTORS[screen.toLowerCase()],
    state: 'visible',
    milliseconds: 6000,
  });
}
