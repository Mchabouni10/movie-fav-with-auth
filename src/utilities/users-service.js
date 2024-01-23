// users-service.js in utilities 

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
  const expiration = payload.exp * 1000; // Convert seconds to milliseconds

  return expiration > Date.now();
}



export async function getCurrentUser() {
  const token = getToken();

  if (!token) {
    // User is not authenticated
    return null;
  }

  try {
    // Replace the following endpoint with your actual backend API endpoint to get the current user
    const response = await fetch('/api/users/current', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current user');
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    throw error;
  }
}
