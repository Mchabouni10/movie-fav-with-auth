//compenents/authpage/authpage.jsx
// AuthPage component


import React, { useState } from 'react';
import './AuthPage.css'; 
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='auth-page-container'>
      {/* <div>
        <h3 onClick={toggleForm}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3>
      </div> */}
      {showLogin ? <LoginForm setUser={setUser} toggleForm={toggleForm} /> : <SignUpForm setUser={setUser} toggleForm={toggleForm} />}
    </div>
  );
}


