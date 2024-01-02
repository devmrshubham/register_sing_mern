import React from "react";
import Register from "./Pages/Register";
import Login from "./Pages/Login"
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgate from "./Pages/Forgate_password";
import ResetPassword from "./Pages/Reset_password"


const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgate_password" element={<Forgate />} />
        <Route path="/reset_password/:id/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
};

export default App;
