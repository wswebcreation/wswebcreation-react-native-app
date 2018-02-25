import { When, Then } from 'cucumber';
import { chatBoxIsVisible, selectChat, verifyChatsShownInView } from '../screen-objects/chat';

When(
  /I select the first chat/,
  () => {
    selectChat('Dick Tracy');
  },
);

Then(
  /the Chatbox should be visible/,
  () =>{
    chatBoxIsVisible();
  }
);

Then(
  /the following chats would be shown/,
  (table) => {
    verifyChatsShownInView(table, true);
  },
);
