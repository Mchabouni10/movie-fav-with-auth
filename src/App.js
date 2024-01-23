import "./App.css";
import { useState, useContext  } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./components/AuthPage/AuthPage";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/Homepage/HomePage";
import FavoritePage from "./pages/Favoritepage/FavoritePage";
import DeleteMovie from "./components/DeleteMovie/DeleteMovie";
import EditMovie from "./components/EditMovie/EditMovie";
import UserProfile from "./components/UserProfile/UserProfile";


function App() {
  const [user, setUser] = useState(getUser());
  
  return (
    <div className="App">

      {user ? (
        <>
          <Navbar user={user} setUser={setUser} />
          <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} />

          <Route path="/favorites/:id/delete" element={<DeleteMovie />} />
          <Route path="/favorites/:id/edit" element={<EditMovie />} />
          <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </>
      ) : (
        <AuthPage user={user} setUser={setUser}/>
      )}
    </div>
  );
}

export default App;








