// import { defineSupportCode } from 'cucumber';
// import { waitForScreenToBeVisible } from '../screen-objects/base';
// import {
//   agreeTermsConditions,
//   enterPincode,
//   loginFormIsVisible,
//   pincodeBubbleIsVisible,
//   selectOption,
//   submitCredentialsInLoginForm,
//   waitForCurrentSubscription,
// } from '../screen-objects/onboarding';
// import { ONBOARDING } from '../support/constants';
//
// defineSupportCode(({ Given, When, Then }) => {
//   Given(
//     /the account selection is visible/,
//     () => {
//       waitForScreenToBeVisible(ONBOARDING);
//       waitForCurrentSubscription();
//     },
//   );
//   When(
//     /I select (Jazeker!|Nee, nog niet|Weet ik niet)/,
//     (option) => {
//       selectOption(option);
//     },
//   );
//   When(
//     /I submit my credentials in the login form/,
//     () => {
//       submitCredentialsInLoginForm();
//     },
//   );
//   When(
//     /I enter a new pincode/,
//     () => {
//       enterPincode('11111');
//     },
//   );
//   When(
//     /I re-enter an incorrect pincode/,
//     () => {
//       enterPincode('12345', true);
//     },
//   );
//   When(
//     /I re-enter the new pincode/,
//     () => {
//       enterPincode('11111', true);
//     },
//   );
//   When(
//     /I agree with the terms and conditions/,
//     () => {
//       agreeTermsConditions();
//     },
//   );
//   Then(
//     /the login form would be visible/,
//     () => {
//       loginFormIsVisible();
//     },
//   );
//   Then(
//     /the pincode bubble would be visible/,
//     () => {
//       pincodeBubbleIsVisible();
//     },
//   );
// });
