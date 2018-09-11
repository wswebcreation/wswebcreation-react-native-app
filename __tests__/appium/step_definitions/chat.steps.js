import { When, Then } from 'cucumber';
import {
  chatBoxIsVisible,
  selectChat,
  submitChat,
  verifyChatsShownInView,
} from '../screen-objects/chat';

When(
  /I select the first chat/,
  () => {
    selectChat('Dick Tracy');
  },
);

When(
  /I chat "(.*)"/,
  (chat) => {
    submitChat(chat);
  },
);

Then(
  /the Chatbox should be visible/,
  () => {
    chatBoxIsVisible();
  },
);

Then(
  /the following chats would be shown/,
  (table) => {
    verifyChatsShownInView(table);
  },
);
