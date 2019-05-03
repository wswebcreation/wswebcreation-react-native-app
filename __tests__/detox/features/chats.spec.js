import { screens } from '../screen-objects/base';
import { addChat, getChatBubble, selectFirstChat } from '../screen-objects/chats';
import { selectScreenFromTabBar } from '../screen-objects/navigation';
import { SCREENS, TABBAR } from '../support/constants';

describe('Use the Chats', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
    await selectScreenFromTabBar(TABBAR.CHATS);
    await expect(screens(SCREENS.CHATS)).toBeVisible();
    await selectFirstChat();
  });

  it('should validate the default chats', async () => {
    await expect(getChatBubble(0)).toBeVisible();
    await expect(getChatBubble(1)).toBeVisible();
  });

  it('should able to chat and get a random response back', async () => {
    await addChat('Hello');

    await expect(getChatBubble(0)).toBeVisible();
    await expect(getChatBubble(1)).toBeVisible();
    await expect(getChatBubble(2)).toBeVisible();
    await expect(getChatBubble(3)).toBeVisible();
  });
});
