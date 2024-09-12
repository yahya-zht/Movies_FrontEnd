import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function Navbar() {
  const { auth, user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const Path = location.pathname;
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
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
          <div className="relative">
            {auth ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white focus:outline-none hover:text-blue-600 px-4 py-2 font-bold"
                >
                  {user ? user.name : "User"}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-20">
                    <button
                      onClick={() => (window.location.href = "/profile")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => (window.location.href = "/dashboard")}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : Path === "/login" ? (
              <button
                onClick={() => (window.location.href = "/register")}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Register
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/login")}
                className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
