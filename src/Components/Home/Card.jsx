import React, { useEffect, useState } from "react";
import "./Card.scss";
import { FaPlay, FaPlus } from "react-icons/fa6";
import { IoBookmarkSharp } from "react-icons/io5";
import { getWatchList } from "../../Slice/homeSlice";
import { useDispatch, useSelector } from "react-redux";

const imgUrl = "https://image.tmdb.org/t/p/original";
const styleBackdropImgNotThere = {
  color: "white",
  height: "11.2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Card = ({ title, overview, img, backdropImg, movie }) => {
  const dispatch = useDispatch();
  const [watchlisted, setWatchlisted] = useState(false);

  const addToWatchList = (movie) => {
    const watchlistStore = localStorage.getItem("watchlistData");
    let watchlistData = watchlistStore ? JSON.parse(watchlistStore) : [];
    const index = watchlistData.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      watchlistData.push(movie);
      localStorage.setItem("watchlistData", JSON.stringify(watchlistData));
      setWatchlisted(true);
    } else {
      watchlistData.splice(index, 1);
      localStorage.setItem("watchlistData", JSON.stringify(watchlistData));
      setWatchlisted(false);
    }
  };
  
  const data = localStorage.getItem("watchlistData");
  let storeData = data ? JSON.parse(data) : []
  const storeDataIndex = storeData.findIndex((item) => item.id === movie.id);
  useEffect(() => {
    if (storeDataIndex !== -1) {
      setWatchlisted(true);
      dispatch(getWatchList(storeData));
    } else {
      setWatchlisted(false);
      dispatch(getWatchList(storeData));
    }
  }, [storeDataIndex]);

  return (
    <>
      <div className="cards">
        <div className="card">
          <div
            className={`watchList-tag ${
              watchlisted ? "watchList-tag" : "watchList-removedTag"
            } `}
          >
            <IoBookmarkSharp />
          </div>
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
                  <FaPlay /> Watch Trailer
                </button>

                {/* watchlist button*/}
                <button
                  className={`watchlist-btn ${
                    watchlisted ? "watchlisted" : "unwatchlisted"
                  }`}
                  onClick={() => addToWatchList(movie)}
                >
                 {watchlisted ? <IoBookmarkSharp/> :  <FaPlus />} 
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
