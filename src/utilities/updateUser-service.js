// updateUser-service.js
import { getToken } from './users-service';

export async function updateUserProfile(formData, userId) {
  const token = getToken();

  if (!token || !userId) {
    console.error('User is not authenticated or User ID is missing');
    throw new Error('User is not authenticated or User ID is missing');
  }

  try {
    const response = await fetch(`/api/users/update-profile/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // ✅ Authorization is set here, without Content-Type
      },
      body: formData, // ✅ Let the browser set Content-Type automatically for FormData
    });

    if (!response.ok) {
      // ✅ Check if the response contains JSON before parsing
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user profile.');
      } else {
        console.error('Invalid content type in response. Expected JSON.');
        throw new Error('Failed to update user profile. Please try again later.');
      }
    }

    return await response.json(); // ✅ Return updated user object
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw new Error('An error occurred while updating the profile. Please try again.');
  }
}

  