import { screens } from '../screen-objects/base';
import { selectScreenFromTabBar } from '../screen-objects/navigation';
import { SCREENS, TABBAR } from '../support/constants';

describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should navigate through the app with the tabbar', async () => {
    await selectScreenFromTabBar(TABBAR.WEBVIEW);
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
    await selectScreenFromTabBar(TABBAR.CHATS);
    await expect(screens(SCREENS.CHATS)).toBeVisible();
    await selectScreenFromTabBar(TABBAR.HOME);
    await expect(screens(SCREENS.HOME)).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
