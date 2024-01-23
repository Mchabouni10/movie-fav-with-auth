// UserProfile.js
import React, { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service";
import sendRequest from "../../utilities/send-request";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile information
    const fetchUserProfile = async () => {
      try {
        // Make a GET request to the user profile endpoint
        const userProfile = await sendRequest("/api/users/profile", "GET");

        // Set the user profile in the component state
        setUser(userProfile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Call the fetchUserProfile function
    fetchUserProfile();
  }, []);

  // If user data is not yet loaded, display a loading message
  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileHeading}>User Profile</h2>
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
        <strong>Registered On:</strong> {new Date(user.createdAt).toLocaleString()}
      </p>
      <p className={styles.profileInfo}>
        <strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/A"}
      </p>
      <p className={styles.profileInfo}>
        <strong>Location:</strong> {user.location || "N/A"}
      </p>
    </div>
  );
};

export default UserProfile;

