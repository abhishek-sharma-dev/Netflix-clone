import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Tvshows from "./Components/Home/Tvshows";
import Movies from "./Components/Home/Movies";
import ViewallCardsPage from "./Components/Home/ViewallCardsPage";
// import { Footer } from "./Components/Footer/Footer";

function App() {
  const [inputValues, setInputValue] = useState();

  const handleLogin = (loginData) => {
    console.log(inputValues);
    setInputValue(loginData);
  };

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<Tvshows />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/viewall" element={<ViewallCardsPage/>}/>
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
