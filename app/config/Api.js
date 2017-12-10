import { API_HEADERS, BASE_URL } from './Constants';

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
    return apiConfig('649da4cc49beb5bc180534e039535168/raw/2975c9f42763917b1f12e90512472e5ca34623ca/conversation.json');
  },
  getChatHistory() {
    return apiConfig('b1979ed905833186e5526a3bcf31bc76/raw/7747033bca722e1157c6771f0c045da184e286d2/chat.history.json');
  },
  getOnelinersResponse() {
    return apiConfig('46101d9f04bbc90622e68c6f2ac2bdce/raw/88f23f10983d99dbf98524a487870ff9bf6684c7/onliners.response.json');
  },
};