import React, { useEffect, useState } from "react";
import "./Home.scss";
import Row from "./Row";
import axios from "axios";
import Banner from "./Banner";

const API_KEY = "007a2d5309887e843e4f963c9c6bb243";
const imgUrl = "https://image.tmdb.org/t/p/original";
const URL = "https://api.themoviedb.org/3";
const genreUrl = `${URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`;

const movie = "movie";
const tv = "tv";

function Home() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [randomBannerImg, setRandomBannerImg] = useState("");
  const [name, setName] = useState([]);
  const [link, setLink] = useState([]);
  
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
    fetchData(
      `${URL}/trending//${tv}/day?api_key=${API_KEY}&language=en-US&page=1`,
      setTvShows
    );
  }, []);

  useEffect(() => {
    const fetchGenres = async () => {
      const {
        data: { genres },
      } = await axios.get(
        `${URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const allMoviesLink = genres.map((genre) => `${genreUrl}${genre.id}`);
      const genreName = genres.map((genre) => genre.name);

      const genreDataPromises = allMoviesLink.map((link) => axios.get(link));
      const genreDataResponses = await Promise.all(genreDataPromises);

      setLink(genreDataResponses);
      setName(genreName);
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const bannerImgPath = movies.map(
      (moviesBanner) => moviesBanner.backdrop_path
    );
    const bannerImgUrls = bannerImgPath.map((path) => `${imgUrl}${path}`);
    const randomIndex = Math.floor(Math.random() * bannerImgUrls.length);
    setRandomBannerImg(bannerImgUrls[randomIndex]);
  }, [movies]);

  return (
    <>
      <Banner />
      <div className="home-section">
        <div className="movie-list">
          <Row title={"Trending"} movie={movies} />
          <Row title={"Tv Shows"} movie={tvShows} />
          {/* {name.map((name, index) => 
            <Row key={index} title={name} movie={link} />)} */}
        </div>
      </div>
    </>
  );
}

export default Home;
