import * as labels from '../../../app/config/labels';
import { TEST_PREFIX } from '../support/constants';

export const CHAT_SELECTORS = {
  FIRST_CHAT: `${TEST_PREFIX}Dick Tracy`,
  BUBBLE: `${TEST_PREFIX}${labels.components.messageBubble.accessibilityLabel}`,
  INPUT: `${TEST_PREFIX}${labels.components.chatInput.inputAccessibilityLabel}`,
  SUBMIT_BUTTON: `${TEST_PREFIX}${labels.components.chatInput.sendAccessibilityLabel}`,
};

/**
 * Select a chat by clicking on it
 *
 * @param {string} selector
 *
 * @return {Promise}
 */
export function selectChat(selector){
  return element(by.id(selector)).tap();
}

/**
 * Select the first chat
 *
 * @return {Promise}
 */
export function selectFirstChat(){
  return selectChat(CHAT_SELECTORS.FIRST_CHAT);
}

/**
 * Get back a chat bubble based on an index
 *
 * @param {number} index
 *
 * @return {Promise}
 */
export function getChatBubble(index=0){
  return element(by.id(CHAT_SELECTORS.BUBBLE)).atIndex(index);
}

/**
 * Get back a chat bubble based on an index
 *
 * @param {number} index
 *
 * @return {Promise}
 */
export async function addChat(chatMessage){
  await element(by.id(CHAT_SELECTORS.INPUT)).typeText(chatMessage);
  await element(by.id(CHAT_SELECTORS.SUBMIT_BUTTON)).tap();
}
