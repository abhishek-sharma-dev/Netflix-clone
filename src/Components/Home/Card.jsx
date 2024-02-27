import React from "react";
import "./Card.scss";
import { FaPlay, FaPlus } from "react-icons/fa6";
// import ViewallCardsPage from "./ViewallCardsPage";

const styleBackdropImgNotThere = {
  color: "white",
  height: "11.2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Card = ({ title, overview, img, backdropImg, movie }) => {
  const imgUrl = "https://image.tmdb.org/t/p/original";
  
  return (
    <>
      <div className="cards">
        {/* {movie === null ? <ViewallCardsPage userListData={userList}/> : null} */}
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

              {/* watchNow button*/}
              <div className="card-btn">
                <button className="watchNow-btn">
                  <FaPlay /> Watch Now
                </button>

                {/* watchlist button*/}
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
