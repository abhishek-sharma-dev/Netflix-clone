import React from "react";
import logo from "./img/logo.png";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import { IoSearch } from "react-icons/io5";

import "./Navbar.scss"; // Import the SCSS file

const Navbar = () => {
  const location = useLocation();
  const isLoginPage = (location.pathname === "/login") || (location.pathname === "/signup");

  return (
    <nav className="navbar" style={isLoginPage ? {backgroundColor : 'transparent'} : {}}>
      <div className="logo-contaniner">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="search-bar-conatainer">
        <input type="search" name='searchBar' placeholder="Search..." required/>
        <button className="search-btn">
          <IoSearch />
        </button>
        <label htmlFor="searchBar">Search...</label>
        
      </div>

      <div className="nav-items">
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/myList">My List</Link>
        <Link to="/login">
          <button className="btn login-btn">
            {isLoginPage ? `Login` : 'Logout' }
            {isLoginPage && <MdLogin />}
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
