import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./components/AuthPage/AuthPage";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage/HomePage";
import FavoritePage from "./pages/Favoritepage/FavoritePage";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";
import EditMovie from "./components/EditMovie/EditMovie";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateProfileForm from "./components/UpdateProfileForm/UpdateProfileForm";
import CompleteProfileForm from "./components/CompleteProfileForm/CompleteProfileForm";
import { ThemeProvider } from "../src/components/ThemeContext/ThemeContext";
import "./App.css";

function App() {
  const [user, setUser] = React.useState(getUser());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = getUser();
    console.log("App mounted, user:", currentUser, "token:", token);
    setUser(currentUser); // Ensure state reflects current user
  }, []);

  const requireAuth = (element) => {
    console.log("requireAuth check, user:", user);
    return user ? element : <Navigate to="/login" state={{ from: window.location.pathname }} />;
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    alert("Profile updated successfully!");
  };

  return (
    <ThemeProvider>
      <div className="App">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={requireAuth(<FavoritePage />)} />
          <Route path="/favorites/:id/delete" element={requireAuth(<DeleteMovie />)} />
          <Route path="/favorites/:id/edit" element={requireAuth(<EditMovie />)} />
          <Route path="/profile" element={requireAuth(<UserProfile user={user} />)} />
          <Route
            path="/edit-profile/:userId"
            element={requireAuth(<UpdateProfileForm onUpdate={handleProfileUpdate} />)}
          />
          <Route
            path="/complete-profile"
            element={requireAuth(<CompleteProfileForm onUpdate={handleProfileUpdate} />)}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/profile" /> : <AuthPage setUser={setUser} />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
