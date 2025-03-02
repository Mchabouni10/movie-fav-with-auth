//compenents/authpage/authpage.jsx
// AuthPage component


import React, { useState } from "react";
import "./AuthPage.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin((prev) => !prev);

  return (
    <div className="auth-page-container">
      <div className="toggle-container">
        <h3 className="toggle-button" onClick={toggleForm}>
          {showLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </h3>
      </div>
      {showLogin ? (
        <LoginForm setUser={setUser} toggleForm={toggleForm} />
      ) : (
        <SignUpForm setUser={setUser} toggleForm={toggleForm} />
      )}
    </div>
  );
}



