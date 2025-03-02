//components/signupform/signupform.jsx
// SignUpForm component

import React, { useState } from "react";
import { signUp } from "../../utilities/users-service";
import { Link } from 'react-router-dom';
import './SignUpForm.css';

const SignUpForm = ({ setUser, toggleForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const user = await signUp({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setUser(user);
    } catch (err) {
      setError("Sign Up Failed - Please try again.");
      console.error("Sign Up Error:", err);
    }
  };

  return (
    <div className="signup-form-container">
      <div className="form-signup-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />

          <button className='Login-Out-Button' type="submit" disabled={formData.password !== formData.confirm}>
            SIGN UP
          </button>

          <p>
            Already have an account? <Link to="#" onClick={toggleForm}>Log In</Link>
          </p>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignUpForm;


