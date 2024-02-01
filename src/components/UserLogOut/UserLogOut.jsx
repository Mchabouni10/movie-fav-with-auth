// UserLogOut.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../utilities/users-service';
import './UserLogOut.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

export default function UserLogOut({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
  }

  function handleSignIn() {
    // Redirect to the login page when Sign In button is clicked
    navigate('/login');
  }

  return (
    <div className='user-logout'>
      {user ? (
        // If user is signed in, show user's name and logout icon
        <div>
          {user.name}
          <FontAwesomeIcon className='user-logout-icon' icon={faArrowRightFromBracket} onClick={handleLogOut} />
        </div>
      ) : (
        // If no user is signed in, show "Sign In" button
        <button className='signin-button' onClick={handleSignIn}><FontAwesomeIcon className='faUser-icon' icon={faUser} />Sign In</button>
      )}
    </div>
  );
}



