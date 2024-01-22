// UserLogOut.js

import React, { useState } from 'react';
import { logOut } from '../../utilities/users-service';
import styles from './UserLogOut.module.css';


const defaultProfileImageUrl = '';

export default function UserLogOut({ user, setUser }) {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className={styles.UserLogOut}>
      <label htmlFor="profileImageInput">
        <img
          src={profileImage || defaultProfileImageUrl}
          alt="Profile"
          className={styles.profileImage}
        />
        <input
          type="file"
          id="profileImageInput"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
      </label>
      <div>{user.name}</div>
      <div className={styles.email}>{user.email}</div>
      <button className="btn-sm" onClick={handleLogOut}>
        LOG OUT
      </button>
    </div>
  );
}
