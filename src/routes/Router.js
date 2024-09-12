import React from "react";
import { Routes, Route } from "react-router-dom";
import Films from "../pages/Films";
import DetailsFilm from "../pages/DetailsFilm";
import Login from "../pages/Login";
import Register from "../pages/Register";
export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/details/:id" element={<DetailsFilm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
