import React, { useState } from "react";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff, IoAlertCircleOutline } from "react-icons/io5";
import SignUpValidation from "./SignUpValidation";
import axios from "axios";

const SignUp = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState({});
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const borderStyle = { border: "1px red solid" };
  
  const navigate = useNavigate()
  

  const handleInput = (event) => {
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(SignUpValidation(inputValues));
    if (error.username === "" && error.email === "" && error.password ==="" ) {
      axios.post('http://localhost:5000/signup', inputValues)
      .then(res => navigate('/Login'))
      .catch(err => console.log(err))
    }
  };
  return (
    <>
      <div className="signUpbackground-img"></div>
      <form className="signup-page" onSubmit={handleSubmit}>
        <div className="signup-container">
          <h1>Sign Up</h1>

          <div className="input-area">
            <div className="input-field input-name-field">
              <input
                type="text"
                name="username"
                style={error.username ? borderStyle : {}}
                onChange={handleInput}
                autoComplete="off"
                required
              />
              <label htmlFor="username">Enter your username</label>
              <span>
                {error.username && <IoAlertCircleOutline />}
                {error.username}
              </span>
            </div>

            <div className="input-field input-email-field">
              <input
                type="text"
                name="email"
                style={error.email ? borderStyle : {}}
                onChange={handleInput}
                autoComplete="off"
                required
              />
              <label htmlFor="email">Enter your email</label>
              <span>
                {error.email && <IoAlertCircleOutline />}
                {error.email}
              </span>
            </div>

            <div className="input-field input-password-field">
              <input
                type={passwordType}
                name="password"
                style={error.password ? borderStyle : {}}
                onChange={handleInput}
                required
              />
              <label htmlFor="password">Enter your password</label>
              <div className="password-notice">
                {error.password && <IoAlertCircleOutline />}
                <span>{error.password}</span>
              </div>
              {/* unhide password symbol */}
              <div
                className="unhide-password"
                onClick={() =>
                  setPasswordType(
                    passwordType === "password" ? "text" : "password"
                  )
                }
              >
                {passwordType === "password" ? <IoEye /> : <IoEyeOff />}
              </div>
            </div>

            <div className="signup-btn">
              <button className="btn" type="submit">
                Create Account
              </button>
            </div>

            <div className="login-field">
              <Link to="/login">
                Already a member? <strong>Login</strong>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
