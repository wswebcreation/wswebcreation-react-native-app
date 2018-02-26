import { When, Then } from 'cucumber';
import {
  categoryTestautomationIsShown,
  enterURL,
  openTestautomationCategory,
  switchToContext,
  validateAlertIsShown,
  validateCanNativelyScrollWebview,
  validateCanScrollWebviewWithJavascript,
  waitForWebsiteLoaded
} from '../screen-objects/webview';
import { INCORRECT_URL } from '../support/constants';

When(
  /I want to visit (.*)/,
  (url) => {
    enterURL(url);
  },
);

When(
  /I enter an incorrect url/,
  () => {
    enterURL(INCORRECT_URL);
  },
);

When(
  /I change the context to (webview|native)/,
  (context) => {
    switchToContext(context);
  },
);

When(
  /I open the menu and select the testautomation category/,
  () => {
    openTestautomationCategory();
  },
);

Then(
  /the site is loaded/,
  () => {
    waitForWebsiteLoaded();
  }
);

Then(
  /I can scroll through the site without switching the context/,
  () => {
    validateCanNativelyScrollWebview();
  }
);

Then(
  /I can scroll through the site with Javascript/,
  () => {
    validateCanScrollWebviewWithJavascript();
  }
);

Then(
  /the category testautomation is shown/,
  () => {
    categoryTestautomationIsShown();
  }
);

Then(
  /an error message is shown/,
  () => {
    validateAlertIsShown(INCORRECT_URL);
  }
);
