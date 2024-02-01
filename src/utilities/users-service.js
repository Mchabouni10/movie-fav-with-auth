

import * as usersAPI from './users-api';

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function getToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function logOut() {
  localStorage.removeItem('token');
}

export async function checkToken() {
  const token = getToken();
  if (!token) {
    return false;
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const expiration = payload.exp * 1000; 

  return expiration > Date.now();
}



export async function getCurrentUser() {
  const token = getToken();

  if (!token) {
    // User is not authenticated
    return null;
  }

  try {
    const response = await fetch('/api/users/current', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch current user. Status: ${response.status}`);
      return null; // or throw an error if you want to handle it differently
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const user = await response.json();
      return user;
    } else {
      console.error('Invalid content type in response. Expected JSON.');
      return null; // or handle non-JSON response appropriately
    }
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    throw error;
  }
}



