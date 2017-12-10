import { prefix } from '../support/constants';
import { tapOnButton, waitFor } from '../support/utils';

const logoutSelector = `${prefix}Log out`;
const deleteTokensSelector = `${prefix}Delete Tokens`;

/**
 * Enter a pin
 * @param {string} isValid, possible values can be /(an invalid|a valid)/
 */
export function enterPin(isValid) {
  const pinCode = isValid === 'a valid' ? '11111' : '98765';
  device.keys(pinCode);
}

/**
 * Log out from the app
 */
export function logOut() {
  waitFor({ selector: logoutSelector, state: 'visible' });
  tapOnLogOut();
}

/**
 * Delete tokens
 */
export function deleteTokens() {
  waitFor({ selector: deleteTokensSelector, state: 'visible' });
  tapOnButton(deleteTokensSelector);
}

export function tapOnLogOut() {
  tapOnButton(logoutSelector);
}
