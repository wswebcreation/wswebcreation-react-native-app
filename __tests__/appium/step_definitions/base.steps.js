import { Given, When, Then } from 'cucumber';
import { waitForScreenToBeVisible } from '../screen-objects/base';
import {
  launchApp,
  restartApp,
  swipeDown,
  swipeLeft,
  swipeRight,
  swipeUp,
  tapOnScreen,
} from '../support/utils';

Given(
  /I open the app/,
  () => {
    launchApp();
  },
);

Then(
  /the (Home|Webview|Chats) screen is visible/,
  (screen) => {
    waitForScreenToBeVisible(screen);
  },
);

When(
  /I restart the App/,
  () => {
    restartApp();
  },
);
When(
  /I hide the software keyboard/,
  () => {
    tapOnScreen();
  },
);
When(
  /I swipe (down|up|left|right)/,
  (direction) => {
    switch (direction) {
      case 'down':
        swipeDown();
        break;
      case 'up':
        swipeUp();
        break;
      case 'left':
        swipeLeft();
        break;
      case 'right':
        swipeRight();
        break;
      default:
        console.log('This should never happen');
    }
  },
);
