import {Platform} from 'react-native';
export const BASE_URL = 'https://gist.githubusercontent.com/wswebcreation/';
export const API_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
};
export const CONVERSATION_URL = '649da4cc49beb5bc180534e039535168/raw/2975c9f42763917b1f12e90512472e5ca34623ca/conversation.json';
export const CHAT_HISTORY_URL = 'b1979ed905833186e5526a3bcf31bc76/raw/7d8219c2d6d1c5f37d535018fd6c56ec9eb2a849/chat.history.json';
export const ONE_LINERS_URL = '46101d9f04bbc90622e68c6f2ac2bdce/raw/88f23f10983d99dbf98524a487870ff9bf6684c7/onliners.response.json';

export const IS_IOS = Platform.OS === 'ios';
