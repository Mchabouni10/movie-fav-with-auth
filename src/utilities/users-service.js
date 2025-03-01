const sendRequest = async (url, method = 'GET', payload = null) => {
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  throw new Error('Bad Request');
};

export async function signUp(userData) {
  const token = await sendRequest('/api/users', 'POST', userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await sendRequest('/api/users/login', 'POST', credentials);
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
    return null;
  }
  try {
    const response = await fetch('/api/users/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch current user. Status: ${response.status}`);
      return null;
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const user = await response.json();
      return user;
    } else {
      console.error('Invalid content type in response. Expected JSON.');
      return null;
    }
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    throw error;
  }
}
