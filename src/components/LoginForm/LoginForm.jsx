//components/loginform/loginform.jsx
// LoginForm component
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { login } from '../../utilities/users-service';
import { useNavigate, useLocation, Link } from 'react-router-dom'; 
import './LoginForm.css';

const LoginForm = ({ setUser, toggleForm }) => {
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
    try {
      const user = await login(credentials);
      setUser(user);

      // Redirect to the original page or home if the state is not set
      navigate((location.state && location.state.from) || '/');

    } catch {
      setError("Login Failed - Try Again");
    }
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faUser} size="4x" style={{ marginBottom: '10px', color: 'var(--button-color)' }} />
          </div>
          <label>Email<FontAwesomeIcon icon={faEnvelope} size="1x" style={{marginLeft:'6px', color: 'var(--button-color)' }} /></label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email" 
            required
          />
          <label>Password<FontAwesomeIcon icon={faLock} size="1x" style={{marginLeft:'6px', color: 'var(--button-color)' }} /></label>
          <div style={{ position: 'relative' }}>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required
            />
          </div>
          <button className="Login-Out-Button" type="submit">LOG IN</button>
          <p>
            Don't have an account? <Link to="#" onClick={toggleForm}>Sign Up</Link>
          </p>
        </form>
        <p className="error-message">&nbsp;{error}</p>
      </div>
    </div>
  );
};

export default LoginForm;
