import nameIcon from "./assets/name-icon.png";
import emailIcon from "./assets/email-icon.png";
import passwordIcon from "./assets/password-icon.png";
import "./LoginSignup.css";
import React, { useState } from "react";

function LoginSignup() {
  const [action, setAction] = useState("Log In");

  return (
    <div className="LoginSignUp-body">
      <div className="main-container">
        <div className="header">
          <div className="header-text">{action}</div>
          <div className="header-underline"></div>
        </div>
        <div className="input-fields">
          {action === "Log In" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={nameIcon} alt="name-input-img" />
              <input type="text" placeholder="Name" />
            </div>
          )}
          <div className="input">
            <img src={emailIcon} alt="email-input-img" />
            <input type="email" placeholder="Email" />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="password-input-img" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgor-password">
            Forgot your password? <span>Click Here</span>
          </div>
        )}
        <div className="action-buttons">
          <button
            className={action === "Sign Up" ? "submit" : "submit ocean-blue"}
            onClick={() => {
              action === "Sign Up"
                ? console.log("Sign Up Clicked!")
                : setAction("Sign Up");
            }}
          >
            Sign up
          </button>
          <button
            className={action === "Log In" ? "submit" : "submit ocean-blue"}
            onClick={() => {
              action === "Log In"
                ? console.log("Log In Clicked!")
                : setAction("Log In");
            }}
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
