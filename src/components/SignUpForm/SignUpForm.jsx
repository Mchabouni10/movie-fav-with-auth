//components/signupform/signupform.jsx
// SignUpForm component

import React, { useState } from "react";
import { signUp } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";

const SignUpForm = ({ setUser, toggleForm, setLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      const user = await signUp(userData);
      if (!user) {
        throw new Error("No user data returned from signup");
      }
      setUser(user);
      navigate("/profile");
    } catch (err) {
      console.error("Sign Up Error:", err);
      setError(
        err.message.includes("User already exists")
          ? "User already exists"
          : "Sign Up Failed - Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = () => {
    return (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      formData.password !== formData.confirm
    );
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
          <button
            className="Login-Out-Button"
            type="submit"
            disabled={isFormInvalid()}
          >
            SIGN UP
          </button>
          <p>
            Already have an account?{" "}
            <span className="link" onClick={toggleForm}>
              Log In
            </span>
          </p>
        </form>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SignUpForm;

