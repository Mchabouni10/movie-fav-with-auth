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
    <nav className={`navbar-class ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <div className="navbar-container">
        <div className="leftSection">
          {/* Home Link */}
          <Link
            to="/"
            className={`navbar-links ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            Home
          </Link>

          {/* Profile Link */}
          {user && (
            <Link
              to="/profile"
              className={`navbar-links ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              Profile
            </Link>
          )}

          {/* Favorites Link */}
          {user && (
            <Link
              to="/favorites"
              className={`navbar-links ${
                location.pathname === "/favorites" ? "active" : ""
              }`}
            >
              Favorites
            </Link>
          )}
        </div>

        <div className="rightSection">
          {/* Theme Toggle */}
          <div className="theme-switch">
            <label>
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className="slider round">
                <span className="moon">
                  <FontAwesomeIcon icon={faMoon} />
                </span>
                <span className="sun">
                  <FontAwesomeIcon icon={faSun} />
                </span>
              </span>
            </label>
          </div>

          {/* User Logout or Sign In */}
          {user ? (
            <UserLogOut user={user} setUser={setUser} />
          ) : (
            <Link
              to="/login"
              className={`navbar-links ${
                location.pathname === "/login" ? "active" : ""
              }`}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;




