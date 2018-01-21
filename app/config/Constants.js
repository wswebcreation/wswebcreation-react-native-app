import {Platform} from 'react-native';
export const BASE_URL = 'https://gist.githubusercontent.com/wswebcreation/';
export const API_HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const IS_IOS = Platform.OS === 'ios';
