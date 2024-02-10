// Navbar.js
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import "./Navbar.css";
import UserLogOut from "../UserLogOut/UserLogOut";
import { ThemeContext } from "../ThemeContext/ThemeContext";

function Navbar({ user, setUser }) {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className={`navbar-class ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="navbar-container">
        <div className="leftSection">
          {/* Home Link */}
          <Link
            to="/"
            className={`navbar-links ${
              location.pathname === "/" ? 'active' : ''
            }`}
          >
            {location.pathname === "/" ? "Home" : "Home"}
          </Link>

          {/* Profile Link */}
          <Link
            to="/profile"
            className={`navbar-links ${
              location.pathname === "/profile" ? 'active' : ''
            }`}
          >
            {location.pathname === "/profile" && user
              ? `You are in ${user.name}'s Profile`
              : "Profile"}
          </Link>

          {/* Favorites Link */}
          <Link
            to="/favorites"
            className={`navbar-links ${
              location.pathname === "/favorites" ? 'active' : ''
            }`}
          >
            {location.pathname === "/favorites"
              ? "You are in Favorites"
              : "Favorites"}
          </Link>
        </div>

        <div className="rightSection">
          <div className="theme-switch">
          <label>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className="slider round">
                <span className="moon"><FontAwesomeIcon icon={faMoon} /></span>
                <span className="sun"><FontAwesomeIcon icon={faSun} /></span>
              </span>
            </label>
          </div>

          {/* User Logout */}
          <UserLogOut user={user} setUser={setUser} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




