//utilities/favorites-api.js
import sendRequest from './send-request';

const BASE_URL = '/api/favorites';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function getById(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}