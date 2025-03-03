//utilities/users-service.js
const sendRequest = async (url, method = "GET", payload = null, isFormData = false) => {
  const options = { method };
  if (payload) {
    options.headers = options.headers || {};
    if (!isFormData) {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(payload);
    } else {
      options.body = payload;
    }
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Request failed: ${res.status} ${res.statusText} - ${errorMessage}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Sign Up
export async function signUp(userData) {
  const response = await sendRequest("/api/users", "POST", userData);
  console.log("Signup response:", response);
  localStorage.setItem("token", response.token);
  return response.user;
}

// Login
export async function login(credentials) {
  const response = await sendRequest("/api/users/login", "POST", credentials);
  console.log("Login response:", response);
  localStorage.setItem("token", response.token);
  return response.user;
}

// Get Token
export function getToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("No token found in localStorage");
    return null;
  }
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    if (payload.exp < Date.now() / 1000) {
      console.log("Token expired, removing...");
      localStorage.removeItem("token");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Error decoding token:", error);
    localStorage.removeItem("token");
    return null;
  }
}

// Get User (token payload, fallback only)
export function getUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    return payload.user || payload;
  } catch (error) {
    console.error("Error parsing user from token:", error);
    return null;
  }
}

// Logout
export function logOut() {
  localStorage.removeItem("token");
}

// Check Token Validity
export async function checkToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Error checking token:", error);
    return false;
  }
}

// Get Current User (full data from server)
export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;
  try {
    const response = await fetch("/api/users/profile", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch user: ${response.status}`);
      return null;
    }
    const user = await response.json();
    console.log("Fetched current user:", user);
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

// Update User Profile
export async function updateUserProfile(formData) {
  const token = getToken();
  const user = getUser();
  if (!token || !user) throw new Error("No token or user found");

  const url = `/api/users/update-profile/${user._id}`;
  console.log("Updating profile for user:", user._id, "URL:", url);

  // Convert FormData to JSON with base64 image
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key === "profilePicture" && value instanceof File) {
      const reader = new FileReader();
      const base64Promise = new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(value);
      });
      data[key] = await base64Promise;
    } else {
      data[key] = value;
    }
  }

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    const data = await res.json();
    if (data.token) localStorage.setItem("token", data.token);
    return data.user || data;
  }
  const errorText = await res.text();
  throw new Error(`Profile update failed: ${res.status} - ${errorText}`);
}

// Delete User Profile
export async function deleteUserProfile() {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const res = await fetch("/api/users/profile", {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (res.ok) {
    localStorage.removeItem("token");
    return true;
  }
  throw new Error("Account deletion failed");
}


