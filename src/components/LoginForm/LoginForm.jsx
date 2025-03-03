// components/loginform/LoginForm.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../utilities/users-service";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ setUser, toggleForm, setLoading }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (evt) => {
    setCredentials({
      ...credentials,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      const user = await login(credentials);
      if (!user) {
        throw new Error("Login failed: No user data returned.");
      }
      setUser(user);
      navigate(location.state?.from || "/profile");
    } catch (err) {
      setError("Login Failed - Please check your email or password.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <FontAwesomeIcon
              icon={faUser}
              size="4x"
              style={{ marginBottom: "10px", color: "var(--button-color)" }}
            />
          </div>
          <label>
            Email
            <FontAwesomeIcon
              icon={faEnvelope}
              size="1x"
              style={{ marginLeft: "6px", color: "var(--button-color)" }}
            />
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <label>
            Password
            <FontAwesomeIcon
              icon={faLock}
              size="1x"
              style={{ marginLeft: "6px", color: "var(--button-color)" }}
            />
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button className="Login-Out-Button" type="submit">
            LOG IN
          </button>
          <p>
            Don't have an account?{" "}
            <span className="link" onClick={toggleForm}>
              Sign Up
            </span>
          </p>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;


