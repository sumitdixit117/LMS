import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ApplyLoan from "./components/ApplyLoan";
import Profile from "./components/Profile";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import EditProfile from "./components/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
