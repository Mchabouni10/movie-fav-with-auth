// Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import styles from "./Navbar.module.css";
import UserLogOut from "../UserLogOut/UserLogOut";

function Navbar({ user, setUser }) {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.NavbarContainer}>
        <div className={styles.leftSection}>
          <Link 
            to="/profile"
            className={`${styles.profileLink} ${
              location.pathname === "/profile" ? styles.active : ""
            }`}
          >
            {location.pathname === "/profile" ? `You are in ${user.name}'s Profile` : 'Profile'}
          </Link>
          <Link 
            to="/favorites"
            className={`${styles.favoritePageLink} ${
              location.pathname === "/favorites" ? styles.active : ""
            }`}
          >
            {location.pathname === "/favorites"
              ? "You are in Favorites"
              : "Go to Favorites"}
          </Link>
        </div>

        <div className={styles.rightSection}>
          <UserLogOut user={user} setUser={setUser} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

