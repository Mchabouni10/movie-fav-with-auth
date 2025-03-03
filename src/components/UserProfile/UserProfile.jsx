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
        console.log("Fetched user data:", userProfile);
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

  if (loading) return <p className="loading-message">Loading profile...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!user) return <p className="error-message">User not found.</p>;

  const imageUrl = user.profilePicture || "https://via.placeholder.com/100?text=No+Image";
  console.log("Image URL being requested:", imageUrl);

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

      {/* Profile Header */}
      <div className="profile-header">
        <img
          src={imageUrl}
          alt="Profile"
          className="profile-avatar"
          onLoad={() => console.log("Image loaded successfully:", imageUrl)}
          onError={(e) => console.error("Image load error:", e, "URL:", imageUrl)}
        />
        <h3 className="profile-name">{user.name}</h3>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <p className="profile-info">
          <strong>User ID:</strong> <span className="profile-value">{user._id}</span>
        </p>
        <p className="profile-info">
          <strong>Email:</strong> <span className="profile-value">{user.email}</span>
        </p>
        <p className="profile-info">
          <strong>Phone Number:</strong> <span className="profile-value">{user.phoneNumber || "N/A"}</span>
        </p>
        <p className="profile-info">
          <strong>Country:</strong> <span className="profile-value">{user.country || "N/A"}</span>
        </p>
        <p className="profile-info">
          <strong>Birthdate:</strong> <span className="profile-value">{user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A"}</span>
        </p>
        <p className="profile-info">
          <strong>Registered On:</strong> <span className="profile-value">{new Date(user.createdAt).toLocaleString()}</span>
        </p>
        <p className="profile-info">
          <strong>Last Updated:</strong> <span className="profile-value">{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}</span>
        </p>
      </div>

      {/* Profile Actions */}
      <div className="profile-actions">
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
        <button className="sign-out-button" onClick={handleLogOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default UserProfile;