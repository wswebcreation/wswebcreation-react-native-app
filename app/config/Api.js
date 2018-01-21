import {
  API_HEADERS,
  BASE_URL,
  CHAT_HISTORY_URL,
  CONVERSATION_URL,
  ONE_LINERS_URL
} from './Constants';

const apiConfig = (path) => {
  return fetch(`${BASE_URL}${path}`, {
    method: 'GET',
    headers: {
      ...API_HEADERS,
    }
  })
    .then(response => response.json())
    .catch((error) => console.warn('error = ', error));
};

export const api = {
  getConversation() {
    return apiConfig(CONVERSATION_URL);
  },
  getChatHistory() {
    return apiConfig(CHAT_HISTORY_URL);
  },
  getOneLinersResponse() {
    return apiConfig(ONE_LINERS_URL);
  },
};
