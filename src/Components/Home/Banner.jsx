import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Banner.scss";
import axios from "axios";
import { FaPlay, FaStar } from "react-icons/fa";
import { IoRemoveOutline } from "react-icons/io5";
import { getWatchList, getTrailerVideo } from "../../Slice/homeSlice";
import { useDispatch } from "react-redux";
import { fetchDataFromApi } from "../../utils/api";

const API_KEY = "007a2d5309887e843e4f963c9c6bb243";
const imgUrl = "https://image.tmdb.org/t/p/original";
const URL = "https://api.themoviedb.org/3";

const movie = "movie";

function Banner() {
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [randomBannerImg, setRandomBannerImg] = useState("");
  const [randomBannerMovie, setRandomBannerMovie] = useState(null);
  const [matchedGenresNames, setMatchedGenresNames] = useState([]);
  const [genreId_Name, setGenreId_Name] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      const {
        data: { results },
      } = await axios.get(url);

      setState(results);
    };
    
    fetchData(
      `${URL}/trending/${movie}/day?api_key=${API_KEY}&language=en-US&page=1`,
      setMovies
    );

    const fetchGenres = async () => {
      const {
        data: { genres },
      } = await axios.get(
        `${URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      setGenreId_Name(genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    setRandomBannerMovie(randomMovie);
    if (randomMovie && randomMovie.backdrop_path) {
      setRandomBannerImg(`${imgUrl}${randomMovie.backdrop_path}`);
    }
  }, [movies]);

  useEffect(() => {
    if (
      randomBannerMovie &&
      randomBannerMovie.backdrop_path &&
      genreId_Name.length > 0
    ) {
      const matchedGenres = genreId_Name.filter((bannerMovie) =>
        randomBannerMovie.genre_ids.includes(bannerMovie.id)
      );
      const matchedGenreNames = matchedGenres.map((genre) => genre.name);
      setMatchedGenresNames(matchedGenreNames);
    }
  }, [randomBannerMovie, genreId_Name]);

  const trailetVideo = (movie) => {
    let mediaType = movie.media_type === "movie" ? "movie" : "tv";
    let movieId = movie.id
    trailerVideoData(mediaType, movieId)
  };

  const trailerVideoData = (mediaType, movieId) => {
    let endpoint = ''
    if (mediaType === 'tv') {
      endpoint = `/tv/${movieId}/videos`
    } else {
      endpoint = `/movie/${movieId}/videos`
    }

    fetchDataFromApi(endpoint).then((res) => {
      const trailerData = res.results.filter(
        (data) => data.name === "Official Trailer"
      );
      const { key } = trailerData[0];
      dispatch(getTrailerVideo('https://www.youtube.com/watch?v=' + key))
    }).catch(error => {
      dispatch(getTrailerVideo('Trailer Video is not available'))
      console.error("Error fetching trailer data:", error);
    })
  };

  return (
    <>
      <div className="banner-img">
        <img src={randomBannerImg} alt="poster" />
      </div>
      {randomBannerMovie && randomBannerMovie.backdrop_path && (
        <div className="banner-movie-detail">
          <h1>{randomBannerMovie.title}</h1>
          <span className="banner-movie-rating">
            Rating: <FaStar />
            {randomBannerMovie.vote_average}/10
          </span>
          <p>{randomBannerMovie.overview}</p>

          <div className="banner-genre">
            {matchedGenresNames.map((genreName, index) => (
              <div className="matched-genre-names" key={index}>
                <span>{genreName}</span>
                {index !== matchedGenresNames.length - 1 && <IoRemoveOutline />}
              </div>
            ))}
          </div>
          <button className="watch-now" onClick={() => trailetVideo(randomBannerMovie)}>
            <FaPlay /> Watch Trailer
          </button>
        </div>
      )}
    </>
  );
}

export default Banner;
