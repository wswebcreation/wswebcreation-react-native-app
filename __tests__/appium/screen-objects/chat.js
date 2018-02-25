import * as labels from '../../../app/config/labels';
import { TEST_PREFIX, SCREEN_SELECTORS, WAIT_FOR_STATE } from '../support/constants';
import { getTextOfElement, tapOnButton, waitFor } from '../support/utils';

const CHAT_SELECTORS = {
  BOX: `${TEST_PREFIX}${labels.stackNavigatorTitle.chatBox}`,
  BUBBLE: `${TEST_PREFIX}${labels.components.messageBubble.accessibilityLabel}`,
  INPUT: `${TEST_PREFIX}${labels.components.chatInput.inputAccessibilityLabel}`,
  SUBMIT_BUTTON: `${TEST_PREFIX}${labels.components.chatInput.sendAccessibilityLabel}`,
};

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
export function chatBoxIsVisible() {
  waitFor({
    selector: CHAT_SELECTORS.BOX,
    state: WAIT_FOR_STATE.VISIBLE,
    milliseconds: 6000,
  });
}


/**
 * Wait for all the expected chats to be visible in the view and verify them with a
 * provided set of expected chats
 * @param {Object} table
 * @param {boolean} showTextLogging this is used for debugging, if true it will do some console log
 */
export function verifyChatsShownInView(table, showTextLogging = false) {
  const expectedChats = table.hashes();
  const shownChats = getChatsShownInView();
  if (showTextLogging) {
    console.log('shownChats = ', shownChats);
  }
  let foundChatIndex = 0;
  expectedChats.forEach((expectedChat, index) => {
    if (index === 0) {
      /**
       * Find a partial string in an array and return the index
       */
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < shownChats.length; i++) {
        if (shownChats[i].includes(expectedChat.chatMessage)) {
          foundChatIndex = i;
          break;
        }
      }
    } else {
      foundChatIndex += 1;
    }

    if (expectedChat.chatMessage === 'random response') {
      console.log(`
=======================================================================
 Found random response was:
 
 '${shownChats[foundChatIndex]}'
=======================================================================`)
    } else {
      expect(shownChats[foundChatIndex])
        .to
        .have
        .string(expectedChat.chatMessage);
    }
  });
}

/**
 * Get all the chats that are currently shown in the view of the device.
 * Keep in mind that each device can return a different set of chats
 *
 * @return {Array} of chats
 *
 * @example
 * <pre>
 *  const chats = [
 *    'Hey wassup?',
 *    'So it seems like this internet thing is here to stay, huh?',
 *    '....
 *  ];
 * </pre>
 */
export function getChatsShownInView() {
  const chatInView = $$(CHAT_SELECTORS.BUBBLE);
  const chatsText = [];
  chatInView.forEach((chat) => {
    try {
      chatsText.push(getTextOfElement(chat));
    } catch (error) {
      // Do nothing.
      // It's a partially visible bubble, but no text visible in it so it can't be retrieved
    }
  });
  return device.isAndroid ? chatsText.reverse() : chatsText;
}

/**
 * Add a chat
 * @param {string} chat
 */
export function submitChat(chat) {
  $(CHAT_SELECTORS.INPUT).setValue(chat);
  tapOnButton(CHAT_SELECTORS.SUBMIT_BUTTON);
}
