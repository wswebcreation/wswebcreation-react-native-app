import { bubbleDelay, prefix, screensSelectors } from '../support/constants';
import { waitFor } from '../support/utils';

const chatBubbleSelector = `${prefix}ChatBubble`;
const androidTextSelector = '*//android.widget.TextView';
const iosTextSelector = null;

/**
 * Launch the app only after the first time, because in the init phase the app is already launched
 */
export function launchApp() {
  if (!device.options.firstAppStart) {
    device.launch();
  }
  device.options.firstAppStart = false;
}

/**
 * Restart the app
 */
export function restartApp() {
  device.closeApp();
  launchApp();
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
 *    'Heb je al een MijnTele2 account?',
 *    'Ja Nee Weet niet',
 *    'login ...',
 *    'Super, log dan in met je e-mail adres en wachtwoord...'
 *  ];
 * </pre>
 */
export function getChatsShownInView() {
  const chatInView = $$(chatBubbleSelector);
  const chatsText = [];
  chatInView.forEach((chat) => {
    try {
      let visualText = chat.getText(device.isAndroid ? androidTextSelector : iosTextSelector);
      visualText = typeof visualText === 'object' ? visualText.join(' ') : visualText;
      chatsText.push(visualText);
    } catch (error) {
      // Do nothing.
      // It's a partially visible bubble, but no text visible in it so it can't be retrieved
    }
  });
  /**
   * @TODO: Remove the reverse in the future
   * For now the bubble plugin reverses the order of the chats on Android which means that the last
   * chat will be returned as the first. To return the same array as on iOS and also to return a
   * expectable and readable chat we reverse the android
   */
  return device.isAndroid ? chatsText.reverse() : chatsText;
}


/**
 * Wait for all the expected chats to be visible in the view and verify them with a
 * provided set of expected chats
 * @param {Object} table
 * @param {boolean} showTextLogging this is used for debugging, if true it will do some console log
 */
export function verifyChatsShownInView(table, showTextLogging = false) {
  const expectedChats = table.hashes();
  device.pause(expectedChats.length * bubbleDelay);
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
    expect(shownChats[foundChatIndex]).to.have.string(expectedChat.chatMessage);
  });
}

/**
 * Wait for a screen to be visible
 * @param {string} screen
 */
export function redirectedToScreen(screen) {
  const screenAccessibilityLabel = screensSelectors[screen];
  waitFor({ selector: screenAccessibilityLabel, state: 'visible' });

  expect(device.isVisible(screenAccessibilityLabel))
    .to.equal(true, `Expected screen "${screenAccessibilityLabel}" to be visible`);
}

/**
 * Wait for a specific screen to be visible
 * @param {string} screen see the 'screensSelectors' const in './constants.js' for all the
 * possible values
 */
export function waitForScreenToBeVisible(screen) {
  waitFor({ selector: screensSelectors[screen], state: 'visible' });
}
