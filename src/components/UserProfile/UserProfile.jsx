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
        const userProfile = await getCurrentUser();
        if (!userProfile) {
          navigate("/login");
          return;
        }
        setUser(userProfile);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load user profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, navigate]);

  const handleDeleteProfile = async () => {
    if (window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) {
      try {
        await deleteUserProfile();
        navigate("/");
      } catch (err) {
        console.error("Error deleting profile:", err);
        setError("Failed to delete profile. Please try again.");
      }
    }
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
    navigate("/");
  };

  if (loading) {
    return <p className="loading-message">Loading profile...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!user) {
    return <p className="error-message">User not found.</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

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
        <strong>Registered On:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className="profile-info">
        <strong>Last Updated:</strong> {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
      </p>
      <p className="profile-info">
        <strong>Country:</strong> {user.country || "N/A"}
      </p>

      {!user.isProfileComplete && (
        <Link to="/complete-profile" className="complete-profile-link">
          Complete Profile
        </Link>
      )}

      <Link to={`/edit-profile/${user._id}`} className="edit-profile-link">
        Edit Profile
      </Link>

      <button className="delete-profile-button" onClick={handleDeleteProfile}>
        Delete Profile
      </button>

      <button className="btn-md" onClick={handleLogOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default UserProfile;

