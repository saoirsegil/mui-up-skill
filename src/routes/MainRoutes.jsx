import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Feature from "../pages/Feature";
import About from "../pages/About";
import Pricing from "../pages/Pricing";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import ForgotPassword from "../components/ForgotPassword";

const MainRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};
export default MainRoutes;
