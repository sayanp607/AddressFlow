import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import ManageAddressPage from "./pages/ManageAddressPage"; // Import Manage Address Page
import FavoritesPage from "./pages/FavouritesPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/manage-addresses" element={<ManageAddressPage />} />{" "}
        {/* Manage Address Page */}
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
