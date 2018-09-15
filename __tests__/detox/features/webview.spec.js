import { screens } from '../screen-objects/base';
import { selectScreenFromTabBar } from '../screen-objects/navigation';
import { enterURL, validateAlertIsShown } from '../screen-objects/webview';
import { SCREENS, TABBAR } from '../support/constants';

describe('Use the webview', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await selectScreenFromTabBar(TABBAR.WEBVIEW);
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
  });

  it('should be able to swipe through the webview without switching context', async () => {
    console.warn('NOT SUPPORTED TO SWIPE THE WEBVIEW OR SWIPE BY COORDINATES');
  });

  it('should be able to scroll through the webview with a Javascript scroll', async () => {
    console.warn('NOT SUPPORTED TO MANIPULATE THE WEBVIEW');
  });

  it('Should be able to see all posts in the testautomation category', async () => {
    console.warn('NOT SUPPORTED TO VIEW ELEMENTS IN THE WEBVIEW');
  });

  it('should be able to validate the error pop', async () => {
    const url = 'wswebcreation.nl';

    await enterURL(url);
    await validateAlertIsShown(url);
  });
});
