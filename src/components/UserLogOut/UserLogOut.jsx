// UserLogOut.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../utilities/users-service";
import "./UserLogOut.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UserLogOut({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate("/"); // Redirect to home after logout
  }

  return (
    <div className="user-logout">
      <FontAwesomeIcon
        className="user-logout-icon"
        icon={faArrowRightFromBracket}
        onClick={handleLogOut}
        title="Log Out"
      />
    </div>
  );
}



