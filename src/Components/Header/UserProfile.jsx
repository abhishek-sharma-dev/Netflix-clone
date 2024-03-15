import React, { useState } from "react";
import "./UserProfile.scss";
import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";

const UserProfile = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  return (
    <>
      <div className="user-profile" onClick={toggleVisibility}>
        <div className="user-name">A</div>

        <div className={`profile-content ${isVisible ? 'visible' : 'hidden'}`}>
          <ul>
            <Link to="/">
              <li>
                <IoPerson />
                Profile
              </li>
            </Link>
            <Link to="/login">
              <li className="logout-btn">
                <FiLogOut />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
