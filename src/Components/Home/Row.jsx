import React from "react";
import "./Row.scss";
import Card from "./Card";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const Row = ({ title, movie }) => {
  const urlPathLoction = useLocation()

  const viewallCards = () => {
    console.log(movie);
  };

  return (
    <div className="movie-row">
      <div className="row-header">
        <h2>{title}</h2>
        <Link
          to="/viewall"
          className="viewall"
          onClick={viewallCards}
        >
          {urlPathLoction.pathname !== '/myList' && 'View All'}
          {urlPathLoction.pathname !== '/myList' && <FaArrowRightLong />}
          
        </Link>
      </div>
      <div className="card-row">
        {movie.map((movie, index) => (
          <Card
            key={index}
            title={movie.title || movie.name}
            overview={movie.overview}
            img={movie.poster_path || movie.profile_path}
            backdropImg={movie.backdrop_path}
            movie={movie}
            // viewallCardPage={viewallCardPage}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
