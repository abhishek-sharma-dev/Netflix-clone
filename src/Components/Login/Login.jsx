import React, { useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff, IoAlertCircleOutline } from "react-icons/io5";
import LoginValidation from "./LoginValidation";
import axios from "axios";

function Login({onLogin}) {
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const borderStyle = { border: "1px red solid" };

  const [inputValues, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setInputValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(LoginValidation(inputValues));
    if (error.email === "" && error.password === "") {
      axios.post("http://localhost:5000/login", inputValues)
        .then((res) => {
          if (res.data.message === "Successfully Login") {
            console.log(res.data.message);
            navigate("/");
            onLogin(inputValues)
          } else {
            alert("Invalid Username or Password");
          }
        })
        .catch((err) => console.log(err));
    }

  };
  
  return (
    <>
      <div className="loginBackground-img"></div>
      <form className="login-page" onSubmit={handleSubmit}>
        <div className="login-container">
          <h1>Login</h1>

          <div className="input-area">
            <div className="input-field inputEmail-field">
              <input
                type="text"
                name="email"
                autoComplete="email"
                style={error.email ? borderStyle : {}}
                onChange={handleInput}
                required
              />
              <label htmlFor="email">Enter your email</label>
              <span>
                {error.email && <IoAlertCircleOutline />}
                {error.email}
              </span>
            </div>

            <div className="input-field inputPassword-field">
              <input
                type={passwordType}
                name="password"
                onChange={handleInput}
                style={error.password ? borderStyle : {}}
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

            <button className="btn login-btn" type="submit">
              Login
            </button>

            <div className="forgot-password-field text-field">
              <Link to="/signup">Forgot Password?</Link>
            </div>

            <div className="signup-field">
              <Link to="/signup">
                Not a member ?<strong> Signup now</strong>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Login;
