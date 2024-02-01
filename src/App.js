// App.js
import React from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./components/AuthPage/AuthPage";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage/HomePage";
import FavoritePage from "./pages/Favoritepage/FavoritePage";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";
import EditMovie from "./components/EditMovie/EditMovie";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateProfileForm from "./components/UpdateProfileForm/UpdateProfileForm";
import { ThemeProvider } from "../src/components/ThemeContext/ThemeContext";
import "./App.css";




function App() {
  const [user, setUser] = React.useState(getUser());
  const { id: userId } = useParams();

  const requireAuth = (element) => {
    return user ? element : <Navigate to="/login" />;
  };


  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    alert("Profile updated successfully!");
  };

 

  return (
    <ThemeProvider>
      <div className="App">
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
            {/* Home page accessible without authentication */}
            <Route path="/" element={<HomePage />} />

            {/* Favorites and Profile pages require authentication */}
            <Route
              path="/favorites"
              element={requireAuth(
                <FavoritePage user={user} setUser={setUser} />
              )}
            />

            <Route
              path="/favorites/:id/delete"
              element={requireAuth(<DeleteMovie />)}
            />
            <Route
              path="/favorites/:id/edit"
              element={requireAuth(<EditMovie />)}
            />
            <Route path="/profile" element={requireAuth(<UserProfile />)} />
            <Route
              path="/update-profile/:id"
              element={requireAuth(
                <UpdateProfileForm onUpdate={handleProfileUpdate} userId={userId} />
              )}
            />

            {/* AuthPage for login and signup */}
            <Route
              path="/login"
              element={<AuthPage user={user} setUser={setUser} />}
            />
          </Routes>
        </>
      </div>
    </ThemeProvider>
  );
}

export default App;
