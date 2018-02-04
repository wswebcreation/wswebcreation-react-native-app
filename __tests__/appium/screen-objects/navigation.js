import * as labels from '../../../app/config/labels';
import { TEST_PREFIX } from '../support/constants';
import { tapOnButton } from '../support/utils';

const TABBAR_SELECTORS = {
  home: `${TEST_PREFIX}${labels.tabNavigator.home}`,
  webview: `${TEST_PREFIX}${labels.tabNavigator.webview}`,
  chats: `${TEST_PREFIX}${labels.tabNavigator.chats}`,
};
const HEADER_BACK_BUTTON = `${TEST_PREFIX}${labels.stackNavigatorTitle.goBackAccessibilityLabel}`;

/**
 * Select screen from the tabbar
 * @param {string} screen see the 'SCREEN_SELECTORS' const in './constants.js' for all the
 * possible values
 */
export function selectScreenFromTabBar(screen) {
  tapOnButton(TABBAR_SELECTORS[screen.toLowerCase()])
}

/**
 * Click on the back button in the header
 */
export function goBackFromHeader(){
  tapOnButton(HEADER_BACK_BUTTON);
}
