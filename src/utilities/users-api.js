//user-api.js in utilities


import sendRequest from './send-request';

const BASE_URL = '/api/users';

/**
 * Sign up a new user
 * @param {Object} userData - The user's sign-up data (name, email, password)
 * @returns {Promise<Object>} - The newly created user object
 */
export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

/**
 * Log in an existing user
 * @param {Object} credentials - User login credentials (email, password)
 * @returns {Promise<Object>} - The authenticated user object
 */
export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}
