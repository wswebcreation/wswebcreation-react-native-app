import * as labels from '../../app/config/labels';
import { TEST_PREFIX } from '../support/constants';

const TABBAR_SELECTORS = {
  home: `${TEST_PREFIX}${labels.tabNavigator.home}`,
  webview: `${TEST_PREFIX}${labels.tabNavigator.webview}`,
  chats: `${TEST_PREFIX}${labels.tabNavigator.chats}`,
};

export const HEADER_BACK_BUTTON = `${TEST_PREFIX}${labels.stackNavigatorTitle.goBackAccessibilityLabel}`;

/**
 * Select screen from the tabbar
 * @param {string} screen see the 'SCREEN_SELECTORS' const in './constants.js' for all the
 * possible values
 */
export function selectScreenFromTabBar(screen) {
  /**
   * When using an extra view with react-navigation to address the test-id and
   * disabling the `tabBarTestIDProps` it still finds multiple elements.
   * By adding `atIndex(#)` it will only click on element #
   */
  return element(by.id(TABBAR_SELECTORS[screen.toLowerCase()])).atIndex(0).tap();
}

/**
 * Get the header back button
 *
 * @return {Promise}
 */
export function headerBackButton(){
  return element(by.id(HEADER_BACK_BUTTON));
}
