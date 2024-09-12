import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Films from "../pages/Films";
import DetailsFilm from "../pages/DetailsFilm";
export default function RouterPage() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Films />} />
        <Route path="/details/:id" element={<DetailsFilm />} />
      </Routes>
    </Router>
  );
}
