import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function EditFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState({
    title: "",
    release_date: "",
    vote_average: "",
    overview: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/films/${id}`)
      .then((response) => {
        setFilm(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching the film data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFilm({ ...film, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/api/films/${id}`, film)
      .then((response) => {
        navigate("/dashboard", {
          state: { message: "Film updated successfully!" },
        });
      })
      .catch((error) => {
        setError("Error updating the film.");
      });
  };

  if (loading)
    return (
      <p className="text-center">
        <CircularProgress /> Loading...
      </p>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Edit Film</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
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
            Save Changes
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
