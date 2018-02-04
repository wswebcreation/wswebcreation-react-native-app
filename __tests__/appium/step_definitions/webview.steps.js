import { When, Then } from 'cucumber';
import { enterURL, waitForWebsiteLoaded } from '../screen-objects/webview';

When(
  /I want to visit (.*)/,
  (url) => {
    enterURL(url);
  },
);

Then(
  /the site is loaded/,
  () =>{
    waitForWebsiteLoaded();
  }
);
