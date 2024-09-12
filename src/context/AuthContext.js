import React, { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  const login = async (email, password) => {
    const response = await axios.post("/api/login", {
      email,
      password,
    });
    const { token } = response.data;
    localStorage.setItem("token", token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
