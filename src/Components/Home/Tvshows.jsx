import React, { useEffect, useState } from "react";
import "./Home.scss";
import Row from "./Row";
import axios from "axios";
import Banner from "./Banner";


const API_KEY = "007a2d5309887e843e4f963c9c6bb243";
const imgUrl = "https://image.tmdb.org/t/p/original";
const URL = "https://api.themoviedb.org/3";

const popular = "popular";
const topRated = "top_rated";
const upcoming = "on_the_air";
const nowPlaying = "airing_today";

function Tvshows() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  // const [genre, setGenre] = useState([]);
  const [randomBannerImg, setRandomBannerImg] = useState("");

  useEffect(() => {
    const bannerImgPath = popularMovies.map((moviesBanner) => moviesBanner.backdrop_path);
    const bannerImgUrls = bannerImgPath.map((path) => `${imgUrl}${path}`);
    const randomIndex = Math.floor(Math.random() * bannerImgUrls.length);
    setRandomBannerImg(bannerImgUrls[randomIndex]);
}, [popularMovies]);

  useEffect(() => {
    const fetchData = async (url, setState) => {
      const {data: { results },} = await axios.get(url);
      setState(results);
    };
    

    fetchData(`${URL}/tv/${popular}?api_key=${API_KEY}&language=en-US&page=1`,setPopularMovies);
    fetchData(`${URL}/tv/${topRated}?api_key=${API_KEY}&language=en-US&page=1`,setTopRatedMovies);
    fetchData(`${URL}/tv/${upcoming}?api_key=${API_KEY}&language=en-US&page=1`,setUpcomingMovies);
    fetchData(`${URL}/tv/${nowPlaying}?api_key=${API_KEY}&language=en-US&page=1`,setNowPlayingMovies);

  }, []);
  return (
    <>
      <Banner/>
      <div className="home-section">
        <div className="movie-list">
          <Row title={"Popular"} movie={popularMovies} />
          <Row title={"Top Rated"} movie={topRatedMovies} />
          <Row title={"Upcoming"} movie={upcomingMovies} />
          <Row title={"Now Playing"} movie={nowPlayingMovies} />
        </div>
      </div>
    </>
  );
}

export default Tvshows