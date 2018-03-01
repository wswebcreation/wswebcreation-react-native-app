import * as labels from '../../app/config/labels';
import { TEST_PREFIX, WAIT_FOR_STATE } from '../support/constants';

const SCREEN_SELECTORS = {
  home: `${TEST_PREFIX}${labels.stackNavigatorTitle.home}`,
  webview: `${TEST_PREFIX}${labels.stackNavigatorTitle.webview}`,
  chats: `${TEST_PREFIX}${labels.chats.window}`,
};

/**
 * Wait for a specific screen to be visible
 * @param {string} screen see the 'SCREEN_SELECTORS' const in './constants.js' for all the
 * possible values
 */
export function screens(screen) {
  return element(by.id(SCREEN_SELECTORS[screen.toLowerCase()]));
}
