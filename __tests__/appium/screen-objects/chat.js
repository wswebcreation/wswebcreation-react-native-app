import * as labels from '../../../app/config/labels';
import { TEST_PREFIX, SCREEN_SELECTORS } from '../support/constants';
import { tapOnButton, waitFor } from '../support/utils';

const CHAT_BOX_SELECTORS = `${TEST_PREFIX}${labels.stackNavigatorTitle.chatBox}`;

/**
 * Select a chat
 * @param {string} name The name of the chat person
 */
export function selectChat(name) {
  tapOnButton(`${TEST_PREFIX}${name}`);
}

/**
 * Wait for the chat box is visible
 */
export function chatBoxIsVisible(){
  waitFor({
    selector: CHAT_BOX_SELECTORS,
    state: 'visible',
    milliseconds: 6000,
  });
}
