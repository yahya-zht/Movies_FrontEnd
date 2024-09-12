import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Stack } from "@mui/material";

const getUserProfile = async (token) => {
  try {
    const response = await axios.get("/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user profile");
  }
};

export default function UserDetails() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(token);
        setUser(userData);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUserProfile();
    if (location.state && location.state.message) {
      setSuccess(location.state.message);
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    }
  }, [token, location.state]);

  if (error) return <p>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <div className="bg-white p-6 rounded shadow-md">
        {success && (
          <Stack sx={{ width: "50%" }} spacing={2}>
            <Alert severity="success">{success}</Alert>
          </Stack>
        )}
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={() => navigate("/edit")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-3"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
}
