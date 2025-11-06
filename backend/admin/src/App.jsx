import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem("isAdminAuthenticated") === "true";
  return isAuth ? children : <Navigate to="/admin/login" replace />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<h2 style={{textAlign:"center", marginTop:40}}>404 — Page not found</h2>} />
    </Routes>
  );
}
