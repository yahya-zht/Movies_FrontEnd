import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function CreateFilm() {
  const navigate = useNavigate();
  const [film, setFilm] = useState({
    id: "",
    title: "",
    release_date: "",
    vote_average: "",
    overview: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genres") {
      setFilm({ ...film, genres: value.split(",") });
    } else {
      setFilm({ ...film, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/films", film)
      .then((response) => {
        setMessageSuccess("Film created successfully!");
        setLoading(false);
        navigate("/dashboard", {
          state: { message: "Film created successfully!" },
        });
      })
      .catch((error) => {
        setError("Error creating the film.");
        setLoading(false);
      });
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Create New Film</h1>
      {loading && (
        <p className="text-center">
          <CircularProgress /> Creating film...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {messageSuccess && <p className="text-green-500">{messageSuccess}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="id">
            ID (unique)
          </label>
          <input
            type="number"
            name="id"
            id="id"
            value={film.id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={film.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="release_date"
          >
            Release Date
          </label>
          <input
            type="date"
            name="release_date"
            id="release_date"
            value={film.release_date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="vote_average"
          >
            Rating
          </label>
          <input
            type="number"
            name="vote_average"
            id="vote_average"
            value={film.vote_average}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="overview"
          >
            Overview
          </label>
          <textarea
            name="overview"
            id="overview"
            value={film.overview}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            rows="4"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Film
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
