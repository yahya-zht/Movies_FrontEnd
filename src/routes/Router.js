import React from "react";
import { Routes, Route } from "react-router-dom";
import Films from "../pages/Films";
import DetailsFilm from "../pages/DetailsFilm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../components/PublicRoute";
export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/details/:id" element={<DetailsFilm />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
    </Routes>
  );
}
