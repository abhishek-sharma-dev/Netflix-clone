import React from "react";
import "./TrailerModal.scss";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa6";
import { getTrailerVideo } from "../../Slice/homeSlice";
import ReactPlayer from "react-player";

const TrailerModal = () => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.data.trailerVideo);

  console.log(trailerVideo);
  const closeTrailer = () => {
    dispatch(getTrailerVideo(""));
  };
  return (
    <>
      {trailerVideo !== "" && (
        <div className="blur-background">
          <div className="trailerVideo-container">
            <div className="header">
              <span className="title">Trailer</span>
              <FaPlus className="cancel-btn" onClick={() => closeTrailer()} />
            </div>
            <div className="videoPlayer">
              {trailerVideo === "Trailer Video is not available" ? (
                <h2>Trailer Video is not available</h2>
              ) : (
                <iframe
                  title="YouTube Video"
                  src={trailerVideo.replace("watch?v=", "embed/")}
                  frameBorder="0"
                  allow="autoplay; encrypted-media;"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrailerModal;
