// UserProfile.js
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getCurrentUser, logOut, deleteUserProfile } from "../../utilities/users-service";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getCurrentUser(); // ✅ Use getCurrentUser instead of sendRequest
        if (!userProfile) {
          navigate("/login"); // ✅ Redirect to login if no user is found
        } else {
          setUser(userProfile);
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, navigate]);

  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser);
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
    navigate("/"); // Redirect to home page after logout
  };

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await deleteUserProfile();
        navigate("/"); // Redirect to home page after deletion
      } catch (err) {
        console.error("Error deleting profile:", err);
        setError("Failed to delete profile. Please try again.");
      }
    }
  };

  if (loading) {
    return <p className="loading-message">Loading profile...</p>; // ✅ Improved loading message
  }

  if (error) {
    return <p className="error-message">{error}</p>; // ✅ Display error if fetching fails
  }

  if (!user) {
    return <p className="error-message">User not found.</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      {/* ✅ Display Profile Picture If Available */}
      {user.profilePicture && (
        <img src={user.profilePicture} alt="Profile" className="profile-picture" />
      )}

      <p className="profile-info">
        <strong>User ID:</strong> {user._id}
      </p>
      <p className="profile-info">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="profile-info">
        <strong>Name:</strong> {user.name}
      </p>
      <p className="profile-info">
        <strong>Username:</strong> {user.username || "N/A"} {/* ✅ Handle missing username */}
      </p>
      <p className="profile-info">
        <strong>Registered On:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className="profile-info">
        <strong>Last Updated:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
      </p>
      <p className="profile-info">
        <strong>Location:</strong> {user.location ? user.location : "N/A"} {/* ✅ Handle missing location */}
      </p>

      {/* ✅ Show Complete Profile Button If Profile Is Incomplete */}
      {!user.isProfileComplete && (
        <Link to="/complete-profile" className="complete-profile-link">
          Complete Profile
        </Link>
      )}

      {/* ✅ Edit Profile Button */}
      <Link to={`/edit-profile/${user._id}`} className="edit-profile-link">
        Edit Profile
      </Link>

      {/* ✅ Delete Profile Button */}
      <button className="delete-profile-button" onClick={handleDeleteProfile}>
        Delete Profile
      </button>

      {/* ✅ Sign Out Button */}
      <button className="btn-md" onClick={handleLogOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default UserProfile;

