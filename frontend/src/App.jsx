// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Landlist from "./Pages/Landlist";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/landlist" element={<Landlist />} />
      {/* If you add post page later, add route here */}
    </Routes>
  );
}

export default App;
