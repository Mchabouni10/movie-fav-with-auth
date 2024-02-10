// UserProfile.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import sendRequest from "../../utilities/send-request";
import "./UserProfile.css";
import { logOut } from "../../utilities/users-service";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await sendRequest("/api/users/profile", "GET");
        setUser(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  
  // const handleUpdateProfile = (updatedUser) => {
  //   // Update the user state with the new user data
  //   setUser(updatedUser);
  // };

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">User Profile</h2>

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
        <strong>Username:</strong> {user.username}
      </p>
      <p className="profile-info">
        <strong>Registered On:</strong>{" "}
        {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className="profile-info">
        <strong>Last Updated:</strong>{" "}
        {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
      </p>
      <p className="profile-info">
        <strong>Location:</strong> {user.location || "N/A"}
      </p>

      <Link to={`/update-profile/${user._id}`} className="update-profile-link">
        Update Profile
      </Link>

      <button className="btn-md" onClick={handleLogOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default UserProfile;
