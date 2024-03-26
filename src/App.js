import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.scss";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Tvshows from "./Components/Home/Tvshows";
import Movies from "./Components/Home/Movies";
import ViewallCardsPage from "./Components/Home/ViewallCardsPage";
import { fetchDataFromApi } from "./utils/api";
import { getImageUrl, getGeners, getPopularMovies } from "./Slice/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import WatchListPage from "./Components/Home/WatchListPage";
import TrailerModal from "./Components/Home/TrailerModal";
// import { Footer } from "./Components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchImageUrl = () => {
      fetchDataFromApi("/configuration").then((res) => {
        const imageUrl = res.images.secure_base_url + "original";
        dispatch(getImageUrl(imageUrl));
      });
    };
    fetchImageUrl();

    const movieData = () => {
      fetchDataFromApi("/movie/popular").then((res) => {
        const popularMoviesData = res.results;
        dispatch(getPopularMovies(popularMoviesData));
      });
    };
    movieData();

    const genereData = () => {
      Promise.all([
        fetchDataFromApi("/genre/movie/list"),
        fetchDataFromApi("/genre/tv/list"),
      ])
        .then(([movieRes, tvRes]) => {
          dispatch(
            getGeners({
              movieGeneres: movieRes.genres || [],
              tvGeneres: tvRes.genres || [],
            })
          );
        })
        .catch((error) => {
          console.error("Error fetching genres:", error); // Log any errors
        });
    };
    genereData();
  }, []);

  const [inputValues, setInputValue] = useState();

  const handleLogin = (loginData) => {
    console.log(inputValues);
    setInputValue(loginData);
  };
  
  return (
    <>
      <Router>

        <Navbar />
        <TrailerModal/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<Tvshows />} />
            <Route path="/mylist" element={<WatchListPage />} />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/viewall" element={<ViewallCardsPage />} />
          </Routes>
        </div>
        {/* <Footer/> */}
      </Router>
    </>
  );
}

export default App;
