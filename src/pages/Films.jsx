import axios from "axios";
import React, { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";
import { CircularProgress } from "@mui/material";
import Pagination from "react-js-pagination";

export default function Films() {
  const [films, setFilms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("/api/films")
      .then((response) => {
        setFilms(response.data);
        setFilteredFilms(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching Films!", error);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = films.filter((film) =>
        film.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFilms(filtered);
    } else {
      setFilteredFilms(films);
    }
    setActivePage(1);
  }, [searchTerm, films]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const indexOfLastFilm = activePage * itemsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - itemsPerPage;
  const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);

  return (
    <div className="container mx-auto">
      <div className="text-start my-4 flex flex-row justify-between items-center">
        <h1 className="text-black text-3xl font-bold">Trending Movies</h1>
        <div className="my-4">
          <input
            type="text"
            placeholder="Search films..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        {currentFilms.length > 0 ? (
          currentFilms.map((film, index) => (
            <CardFilm
              key={index}
              id={film.id}
              img={film.poster_path}
              title={film.title}
              release_date={film.release_date}
              vote_average={film.vote_average}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            {films.length === 0 ? <CircularProgress /> : "No films found"}
          </p>
        )}
      </div>

      {filteredFilms.length > itemsPerPage && (
        <div className="flex justify-center items-center my-4 flex-row text-white">
          <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredFilms.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="px-2 py-1 mx-1 border rounded hover:bg-blue-500 cursor-pointer text-blue-500 hover:text-white "
            activeClass="border-2 border-blue-500 "
            linkClass=""
            innerClass="flex flex-row"
          />
        </div>
      )}
    </div>
  );
}
