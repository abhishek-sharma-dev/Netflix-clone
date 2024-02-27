import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Header/Navbar";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import Tvshows from "./Components/Home/Tvshows";
import Movies from "./Components/Home/Movies";
// import { Footer } from "./Components/Footer/Footer";

function App() {
  const [isloggedin, setIsloggedin] = useState(false);
  const [inputValues, setInputValue] = useState();

  const handleLogin = (loginData) => {
    setInputValue(loginData);
  };

  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            {/* {isloggedin ?
          <> */}
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tvshows" element={<Tvshows />} />
            {/* </>
          : 
          <> */}
            {/* <Route path="*" element={<Navigate to="/login" />} /> */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            {/* </>
          } */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
