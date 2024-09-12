import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ConfirmationModal from "../components/ConfirmationModal";
import { Alert, Stack } from "@mui/material";
export default function Dashboard() {
  const [films, setFilms] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filmToDelete, setFilmToDelete] = useState(null);
  const [messageSuccess, setMessageSuccess] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const itemsPerPage = 5;
  const location = useLocation();

  useEffect(() => {
    fetchFilms();
    if (location.state && location.state.message) {
      console.log("Location==>", location.state.message);
      setMessageSuccess(location.state.message);
      setTimeout(() => {
        setMessageSuccess(null);
      }, 3000);
    }
  }, [location.state]);

  const fetchFilms = async () => {
    try {
      const response = await axios.get("/api/films");
      setFilms(response.data);
    } catch (error) {
      console.error("There was an error fetching the films!", error);
    }
  };

  const indexOfLastFilm = activePage * itemsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - itemsPerPage;
  const currentFilms = films.slice(indexOfFirstFilm, indexOfLastFilm);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };
  const handleDelete = (filmId) => {
    setFilmToDelete(filmId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/films/${filmToDelete}`);
      setFilmToDelete(null);
      setIsModalOpen(false);
      fetchFilms();
      setMessageSuccess("Film deleted successfully!");
      setTimeout(() => {
        setMessageSuccess(null);
      }, 3000);
    } catch (error) {
      setMessageError("Error deleting film.");
      setTimeout(() => {
        setMessageError(null);
      }, 3000);
      console.error("Error deleting film.");
    }
  };
  return (
    <div className="container mx-auto my-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        {messageSuccess && !messageError && (
          <Stack sx={{ width: "50%" }} spacing={2}>
            <Alert severity="success">{messageSuccess}</Alert>
          </Stack>
        )}
        {messageError && !messageSuccess && (
          <Stack sx={{ width: "50%" }} spacing={2}>
            <Alert severity="error">{messageError}</Alert>
          </Stack>
        )}
        <Link
          to="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Film
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Release Date</th>
              <th className="py-3 px-6 text-left">Rating</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentFilms.map((film) => (
              <tr
                key={film.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">{film.title}</td>
                <td className="py-3 px-6 text-left">{film.release_date}</td>
                <td className="py-3 px-6 text-left">{film.vote_average}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-between">
                    <Link
                      to={`/details/${film.id}`}
                      className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                    >
                      <VisibilityIcon />
                    </Link>
                    <Link
                      to={`/edit/${film.id}`}
                      className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110"
                    >
                      <EditIcon />
                    </Link>
                    <button
                      onClick={() => handleDelete(film.id)}
                      className="w-4 transform hover:text-red-500 hover:scale-110"
                    >
                      <DeleteForeverIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {films.length > itemsPerPage && (
        <div className="flex justify-center items-center my-4">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={films.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="px-2 py-1 mx-1 border rounded hover:bg-blue-500 cursor-pointer text-blue-500 hover:text-white "
            activeClass="border-2 border-blue-500 "
            linkClass=""
            innerClass="flex flex-row"
          />
        </div>
      )}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this film?"
      />
    </div>
  );
}
