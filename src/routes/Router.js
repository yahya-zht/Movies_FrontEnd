import React from "react";
import { Routes, Route } from "react-router-dom";
import Films from "../pages/Films";
import DetailsFilm from "../pages/DetailsFilm";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import PublicRoute from "../components/PublicRoute";
import EditFilm from "../pages/EditFilm";
import CreateFilm from "../pages/CreateFilm";
import UserDetails from "../pages/UserDetails";
import UpdateProfile from "../pages/UpdateProfile";
export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/details/:id" element={<DetailsFilm />} />
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <CreateFilm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit"
        element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditFilm />
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
