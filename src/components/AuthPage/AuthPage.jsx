//compenents/authpage/authpage.jsx
// AuthPage component

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";
import { getUser } from "../../utilities/users-service";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      navigate("/profile"); // Redirect to profile if already authenticated
    }
  }, [navigate]);

  const toggleForm = (formType) => {
    setShowLogin(formType === "login");
  };

  return (
    <div className="auth-page-container">
      <div className="toggle-container">
        <button
          className={`toggle-button ${showLogin ? "active" : ""}`}
          onClick={() => toggleForm("login")}
        >
          Log In
        </button>
        <button
          className={`toggle-button ${!showLogin ? "active" : ""}`}
          onClick={() => toggleForm("signup")}
        >
          Sign Up
        </button>
      </div>

      {isLoading ? (
        <p className="loading-message">Loading...</p>
      ) : showLogin ? (
        <LoginForm setUser={setUser} toggleForm={() => toggleForm("signup")} setLoading={setIsLoading} />
      ) : (
        <SignUpForm setUser={setUser} toggleForm={() => toggleForm("login")} setLoading={setIsLoading} />
      )}
    </div>
  );
}



