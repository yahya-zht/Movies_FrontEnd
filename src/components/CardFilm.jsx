import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function CardFilm(props) {
  return (
    <div className="w-60 border-2 border-slate-300 mb-6 rounded-xl shadow-lg drop-shadow-md hover:bg-slate-300 ">
      <Link to={`/details/${props.id}`}>
        <div className="flex flex-col h-full cursor-pointer ">
          <div className="relative ">
            {props.vote_average.toFixed(1) !== "0.0" && (
              <span className="absolute -top-4 -right-4 p-2 bg-yellow-600 border-2 rounded-full font-bold">
                {props.vote_average.toFixed(1)}
              </span>
            )}

            <CardMedia
              component="img"
              height="140"
              image={`https://image.tmdb.org/t/p/original/${props.img}`}
              alt=""
              className="rounded-t-xl"
            />
          </div>
          <div className="px-2 mt-2">
            <Typography gutterBottom variant="h5" component="div">
              {props.title}
            </Typography>
          </div>
          <div className="px-2 mb-2 h-full text-center text-gray-500 text-sm flex items-end justify-center">
            <p>{props.release_date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
