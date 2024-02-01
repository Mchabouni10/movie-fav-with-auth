// updateUser-service.js
import { getToken } from './users-service';

export async function updateUserProfile(formData, userId) {
  const token = getToken();

  console.log('Token:', token);
  console.log('User ID:', userId);

  if (!token || !userId) {
    // User is not authenticated or userId is missing
    console.error('User is not authenticated or User ID is missing');
    throw new Error('User is not authenticated or User ID is missing');
  }

  try {
    const response = await fetch(`/api/users/update-profile/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(`Failed to update user profile: ${errorData.error}`);
      } else {
        console.error('Invalid content type in response. Expected JSON.');
        throw new Error('Failed to update user profile');
      }
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
}


  