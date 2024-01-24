// UserLogOut.js

import React, { useState } from 'react';
import { logOut } from '../../utilities/users-service';
import styles from './UserLogOut.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';




export default function UserLogOut({ user, setUser }) {
 



  function handleLogOut() {
    logOut();
    setUser(null);
  }

  return (
    <div className={styles.UserLogOut}>
      <div>{user.name}
      <FontAwesomeIcon className={styles.logoutIcon} icon={faArrowRightFromBracket} onClick={handleLogOut} /> 
      </div>
    </div>
  );
}
