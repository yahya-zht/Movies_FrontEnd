import axios from "axios";
import React, { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";
import { CircularProgress } from "@mui/material";

export default function Films() {
  const [films, setFilms] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFilms, setFilteredFilms] = useState([]);
  useEffect(() => {
    axios
      .get("/api/films")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.error("There was an error Films!", error);
      });
    handleSearch(searchTerm);
  }, [searchTerm]);
  const handleSearch = (search) => {
    if (search) {
      setFilteredFilms(
        films.filter((film) =>
          film.title.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredFilms([]);
    }
  };
  return (
    <div>
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
      <div>
        {!searchTerm ? (
          <div className="flex flex-wrap justify-between">
            {films && filteredFilms.length === 0 ? (
              films.map((film, index) => (
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
                <CircularProgress />
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            {filteredFilms.length > 0 ? (
              filteredFilms.map((film, index) => (
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
              <p className="text-gray-500 text-center w-full">No films found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
