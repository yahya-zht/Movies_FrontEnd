import React from "react";
import { Routes, Route } from "react-router-dom";
import Films from "../pages/Films";
import DetailsFilm from "../pages/DetailsFilm";
export default function RouterPage() {
  return (
    <Routes>
      <Route path="/" element={<Films />} />
      <Route path="/details/:id" element={<DetailsFilm />} />
    </Routes>
  );
}
