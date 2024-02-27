import React from "react";
import "./Row.scss";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft, FaArrowRightLong } from "react-icons/fa6";

const Row = ({ title, movie }) => {
  const handleScroll = () => {
    
  }
   return (
    <div className="movie-row">
      <div className="row-header">
        <h2>{title}</h2>
        <a href="#" className="viewall">View All <FaArrowRightLong /></a>
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
          />
        ))}

        <div className="forward-scroll" onClick={handleScroll}>
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default Row;
