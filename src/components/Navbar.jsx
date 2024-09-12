import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-2xl font-bold hover:text-blue-600"
          >
            Films
          </Link>
          <Link
            to="/login"
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          >
            Login
          </Link>
        </div>
      </nav>
    </div>
  );
}
