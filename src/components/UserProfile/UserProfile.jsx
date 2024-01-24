// UserProfile.js
import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";
import styles from "./UserProfile.module.css";
import UpdateProfileForm from "../UpdateProfileForm/UpdateProfileForm"; 
import { logOut } from "../../utilities/users-service";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  }, []);

  const handleUpdateProfile = (updatedUser) => {
    // Update the user state with the new user data
    setUser(updatedUser);
  };

  const handleLogOut = () => {
    logOut();
    setUser(null);
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileHeading}>User Profile</h2>

      <p className={styles.profileInfo}>
        <strong>User ID:</strong> {user._id}
      </p>
      <p className={styles.profileInfo}>
        <strong>Email:</strong> {user.email}
      </p>
      <p className={styles.profileInfo}>
        <strong>Name:</strong> {user.name}
      </p>
      <p className={styles.profileInfo}>
        <strong>Username:</strong> {user.username}
      </p>
      <p className={styles.profileInfo}>
        <strong>Registered On:</strong>{" "}
        {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className={styles.profileInfo}>
        <strong>Last Updated:</strong>{" "}
        {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
      </p>
      <p className={styles.profileInfo}>
        <strong>Location:</strong> {user.location || "N/A"}
      </p>

      {/* Render the UpdateProfileForm component with the onUpdate callback */}
      <UpdateProfileForm onUpdate={handleUpdateProfile} />

      <button className="btn-md" onClick={handleLogOut}>
        SIGN OUT
      </button>
    </div>
  );
};

export default UserProfile;

