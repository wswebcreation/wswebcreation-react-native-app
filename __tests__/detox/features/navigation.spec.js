import { screens } from '../screen-objects/base';
import { selectFirstChat } from '../screen-objects/chats';
import { headerBackButton, selectScreenFromTabBar } from '../screen-objects/navigation';
import { enterURL } from '../screen-objects/webview';
import { SCREENS, TABBAR } from '../support/constants';

describe('Navigate through the app', () => {
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

  it('should navigate through the app by swiping', async () => {
    await screens(SCREENS.HOME).swipe('left');
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
    await screens(SCREENS.WEBVIEW).swipe('left', 'fast', 0.9);
    await expect(screens(SCREENS.CHATS)).toBeVisible();
    await screens(SCREENS.CHATS).swipe('right');
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
    await screens(SCREENS.WEBVIEW).swipe('right');
    await expect(screens(SCREENS.HOME)).toBeVisible();
  });

  it('should be able to use the back button in the webview header', async () => {
    await selectScreenFromTabBar(TABBAR.WEBVIEW);
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
    await enterURL('www.wswebcreation.nl');
    await expect(headerBackButton()).toBeVisible();
    await headerBackButton().tap();
    await expect(screens(SCREENS.WEBVIEW)).toBeVisible();
  });

  it('should be able to use the back button in the chatbox header', async () => {
    await selectScreenFromTabBar(TABBAR.CHATS);
    await expect(screens(SCREENS.CHATS)).toBeVisible();
    await selectFirstChat();
    await expect(screens(SCREENS.CHAT_BOX)).toBeVisible();
    await headerBackButton().tap();
    await expect(screens(SCREENS.CHATS)).toBeVisible();
  });
});
