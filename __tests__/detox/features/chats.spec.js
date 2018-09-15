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
    await expect(getChatBubble(0)).toHaveLabel('Hey wassup?');
    await expect(getChatBubble(1)).toHaveLabel('So it seems like this internet thing is here to stay, huh?');
  });

  it('should able to chat and get a random response back', async () => {
    const chat = 'Hello';
    await addChat(chat);
    await expect(getChatBubble(0)).toHaveLabel('Hey wassup?');
    await expect(getChatBubble(1)).toHaveLabel('So it seems like this internet thing is here to stay, huh?');
    await expect(getChatBubble(2)).toHaveLabel(chat);
    await expect(getChatBubble(3)).toBeVisible();
  });
});
