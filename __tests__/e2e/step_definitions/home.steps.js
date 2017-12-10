// import { defineSupportCode } from 'cucumber';
// import { redirectedToScreen } from '../screen-objects/base';
// import {
//   deleteTokens,
//   enterPin,
//   logOut,
// } from '../screen-objects/home';
//
// defineSupportCode(({ When, Then }) => {
//   When(
//     /I enter (an invalid|a valid) pin/,
//     (isValid) => {
//       enterPin(isValid);
//     },
//   );
//   When(
//     /I logout/,
//     () => {
//       logOut();
//     },
//   );
//   When(
//     /I delete the tokens/,
//     () => {
//       deleteTokens();
//     },
//   );
//   Then(
//     /I'm redirected the (.*) screen/,
//     (screen) => {
//       redirectedToScreen(screen);
//     },
//   );
// });
