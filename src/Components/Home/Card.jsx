import React, { useState } from "react";
import "./Card.scss";
import { FaPlay, FaPlus } from "react-icons/fa6";
import TrailerVideoPanel from "./TrailerVideoPanel";
import movieTrailer from "movie-trailer";

const styleBackdropImgNotThere = {
  color: "white",
  height: "11.2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Card = ({ title, overview, img, backdropImg, movie }) => {
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const [trailerUrl, setTrailerUrl] = useState("")
  
  // const handleShowVideo = () => {
  //   if (trailerUrl) {
  //     setTrailerUrl('')
  //   }else{
  //     movieTrailer(title)
  //     .then(url => {
  //       // https://www.youtube.com/watch?v=XtMThy8QKqU  ---> sample-url
  //       const urlParams = new URLSearchParams(new URL(url).search)
  //       console.log(urlParams.get('v'));


  //       setTrailerUrl(urlParams.get('v'))
  //     }).catch(error => console.log(error))
  //   }
  // };

  return (
    <>
    {/* <TrailerVideoPanel trailerUrlId={trailerUrl}/> */}
    
      <div className="cards">
        <div className="card">
          <div className="card-img">
            <img src={`${imgUrl}/${img}`} alt="poster" />
          </div>

          <div className="popupCard">
            <div className="popupCard-bgImg">
              {backdropImg ? (
                <img src={`${imgUrl}/${backdropImg}`} alt="" />
              ) : (
                <h3 style={styleBackdropImgNotThere}>Image Not Available</h3>
              )}
            </div>
            <div className="popupCard-details">
              <h3>{title}</h3>

              <div className="card-btn">
                <button className="watchNow-btn">
                  <FaPlay /> Watch Now
                </button>

                <button className="watchlist-btn">
                  <FaPlus />
                </button>
              </div>

              <div className="movie-overview">
                {overview ? (
                  <span>{overview}</span>
                ) : (
                  <span style={{ marginTop: "3rem" }}>
                    Overview Not Available!.
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
