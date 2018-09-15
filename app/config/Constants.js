import { Dimensions, ListView, Platform } from 'react-native';
import Config from 'react-native-config';

/**
 * API stuff
 */
export const BASE_URL = Config.BASE_URL;
export const API_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
};
export const CONVERSATION_URL = '649da4cc49beb5bc180534e039535168/raw/2975c9f42763917b1f12e90512472e5ca34623ca/conversation.json';
export const CHAT_HISTORY_URL = 'b1979ed905833186e5526a3bcf31bc76/raw/7d8219c2d6d1c5f37d535018fd6c56ec9eb2a849/chat.history.json';
export const ONE_LINERS_URL = '46101d9f04bbc90622e68c6f2ac2bdce/raw/88f23f10983d99dbf98524a487870ff9bf6684c7/onliners.response.json';

/**
 * Device stuff
 */
export const IS_IOS = Platform.OS === 'ios';
export const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');
export const ENV_STRINGS = {
  AUTOMATION: 'automation',
  DEV: 'development',
};
export const ENVIRONMENT = Config.ENVIRONMENT;
export const IS_AUTOMATION_BUILD = ENVIRONMENT === ENV_STRINGS.AUTOMATION;
export const TESTING_ENVIRONMENTS = [ENV_STRINGS.DEV, ENV_STRINGS.AUTOMATION];
export const APP_URI = 'wswebcreationapp';
export const DEEPLINK_MOCKED_USER = {
  firstName: 'Dick',
  lastName: 'Tracy',
  conversation: [
    {
      placeRight: true,
      message: 'So it seems like this internet thing is here to stay, huh?'
    },
    {
      placeRight: false,
      message: 'Hey wassup?',
    },
  ],
  read: true,
  lastMessage: 'So it seems like this internet thing is here to stay, huh?',
  date: '09-Dec-2017',
  time: '1:33 PM',
  image: 'https://randomuser.me/api/portraits/men/3.jpg'
};
