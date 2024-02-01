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
    setError("");
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await signUp(formData);
      setUser(user);
    } catch {
      setError("Sign Up Failed - Try Again");
    }
  };

  const disable = formData.password !== formData.confirm;

  return (
    <div>
      <div className="form-signup-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button className='Login-Out-Button' type="submit" disabled={disable}>
            SIGN UP
          </button>
          <p>
            Already have an account? <Link to="#" onClick={toggleForm}>Log In</Link>
          </p>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
};

export default SignUpForm;


