import * as nl from '../../../app/i18n/locales/nl.json';
import { tapOnButton, waitFor } from '../support/utils';
import { prefix } from '../support/constants';

const selectors = {
  currentSubscriptionSelectionSelector: `${prefix}Select menu`,
  chat: {
    termsAndConditions: prefix + nl.onboarding.chat.termsAndConditionsButtonText,
  },
  loginForm: {
    accessibilityLabel: prefix + nl.loginForm.accessibilityLabel,
    emailPlaceholder: prefix + nl.loginForm.emailPlaceholder,
    passwordPlaceholder: prefix + nl.loginForm.passwordPlaceholder,
    loginButton: prefix + nl.loginForm.loginButton,
    forgotAccountLink: prefix + nl.loginForm.forgotAccountLink,
    togglePasswordVisibility: prefix + nl.loginForm.togglePasswordVisibility,
  },
  pin: {
    accessibilityLabel: prefix + nl.pin.accessibilityLabel,
  },
};

/**
 * Enter a pincode
 * @param {string} pincode The pincode
 * @param {boolean} reEnter if true we need to pick the reenter field because there are 2 pincode
 * fields with the same selector
 * @TODO: figure out why the keyboard in reenter is changed to a QWERTY.
 * This is only during automation on Android and not manual
 */
export function enterPincode(pincode, reEnter = false) {
  //$$(selectors.pin.accessibilityLabel)[reEnter ? 1 : 0].addValue(pincode);
  device.keys(pincode);
}

/**
 * Wait for the login form to be visible
 */
export function loginFormIsVisible() {
  waitFor({ selector: selectors.loginForm.accessibilityLabel, state: 'visible' });
}

/**
 * Wait for the pincode bubble to be visible
 */
export function pincodeBubbleIsVisible() {
  waitFor({ selector: selectors.pin.accessibilityLabel, state: 'visible' });
}

/**
 * Select on option based on a accessibility id
 * @param {string} option text without a ~
 */
export function selectOption(option) {
  tapOnButton(`~${option}`);
}

/**
 * Submit credentials in the login form
 */
export function submitCredentialsInLoginForm() {
  $(selectors.loginForm.emailPlaceholder).setValue('danielle.opkerk@tele2.com');
  $(selectors.loginForm.passwordPlaceholder).setValue('Welkom01');
  tapOnButton(selectors.loginForm.loginButton);
  waitFor({
    selector: selectors.loginForm.accessibilityLabel,
    state: 'exist',
    falseState: true,
    milliseconds: 25000,
  });
}

/**
 * Wait for the current subscription select box
 */
export function waitForCurrentSubscription() {
  waitFor({ selector: selectors.currentSubscriptionSelectionSelector, state: 'visible' });
}

/**
 * Agree with the terms and conditions
 */
export function agreeTermsConditions() {
  tapOnButton(selectors.chat.termsAndConditions);
}
