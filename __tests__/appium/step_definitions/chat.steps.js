import { When, Then } from 'cucumber';
import { chatBoxIsVisible, selectChat } from '../screen-objects/chat';

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
