import { CardMedia } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetailsFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState();
  const [otherDetails, setOtherDetails] = useState({});
  useEffect(() => {
    axios
      .get(`/api/films/${id}`)
      .then((response) => {
        setFilm(response.data);
      })
      .catch((error) => {
        console.error("There was an error Film!", error);
      });
    const API_URL = "https://api.themoviedb.org/3/movie";
    const API_Key = "dd8596e812aa1ea865a8c164dc2c0836";
    axios
      .get(`${API_URL}/${id}?api_key=${API_Key}`)
      .then((response) => {
        setOtherDetails(response.data);
      })
      .catch((error) => {
        console.error("There was an error OtherDetails! ", error);
      });
  }, []);
  return (
    <div className="container mx-auto">
      <div className="mb-10">
        <div className="relative">
          <div className="h-60 flex contrast-50">
            {film && (
              <CardMedia
                component="img"
                height="100"
                image={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`}
                alt=""
                className="rounded-b-xl"
              />
            )}
          </div>
          <div className="absolute -bottom-20 left-7 h-32 flex">
            {film && (
              <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                alt=""
                className="rounded-xl"
              />
            )}
          </div>
        </div>
        <div className="ms-40 mt-5">
          <h1 className="text-2xl font-bold">{film?.title}</h1>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-5/6">
          {otherDetails.genres && (
            <p className="text-end font-mono text-sm text-gray-500">
              {otherDetails.genres.map((n, i) => (
                <span key={i}>{n.name} </span>
              ))}
            </p>
          )}
          <p className="text-justify">{film?.overview}</p>
        </div>
        <div className="w-2/6 ps-5">
          <p>
            <span className="font-bold">Release Date: </span> <br />
            {film?.release_date}
          </p>
          <p>
            <span className="font-bold">Vote Average: </span> <br />
            {film?.vote_average}
          </p>
          <p>
            <span className="font-bold">Popularity: </span> <br />
            {film?.popularity}
          </p>
          <p>
            <span className="font-bold">Budget: </span>
            <br />
            <span className="">
              {otherDetails.budget !== 0 ? otherDetails.budget : "---"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
