import axios from "axios";
import React, { useEffect, useState } from "react";
import CardFilm from "../components/CardFilm";

export default function Films() {
  const [films, setFilms] = useState();

  useEffect(() => {
    axios
      .get("/api/films")
      .then((response) => {
        setFilms(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <div>
      <div className="text-start my-4 border-b-4 border-black">
        <h1 className="text-black text-3xl font-bold">
          List of Trending Movies:
        </h1>
      </div>
      <div className="flex flex-wrap justify-between">
        {films &&
          films.map((film, index) => (
            <CardFilm
              key={index}
              img={film.poster_path}
              title={film.title}
              release_date={film.release_date}
              vote_average={film.vote_average}
            />
          ))}
      </div>
    </div>
  );
}
