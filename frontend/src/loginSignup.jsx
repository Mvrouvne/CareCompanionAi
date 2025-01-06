import nameIcon from "./assets/name-icon.png";
import emailIcon from "./assets/email-icon.png";
import passwordIcon from "./assets/password-icon.png";
import "./LoginSignup.css";
import React, { useState, useEffect } from "react";

function LoginSignup() {
  const [action, setAction] = useState("Log In");
  const [count, setCount] = useState(0);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");

  useEffect(() => {
    if (count) {
      //   if (!Username || !Email || !Password) {
      //     setError("Fields cannot be empty");
      //     return Promise.reject("Fields cannot be empty")
      //   }
      fetch("http://localhost:8000/auth/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   username: Username,
        //   email: Email,
        //   password: Password,
        // }),
      })
        .then((response) => {
            if (!response.ok) {
                setError("Fields cannot be empty");
                alert('ah')
            }
          return response.json();
        })
          .then((data) => {
            // if (Error)
            //     console.log("Response: ", data);
              alert(Error);
        })
        .catch((response) => {
          console.warn("Error: ", response);
        });
    }
  }, [count]);

  return (
    <div className="LoginSignUp-body">
      <div className="main-container">
        <div className="header">
          <div className="header-text">{action}</div>
          <div className="header-underline"></div>
          <p className="error-message">{Error ? Error : null}</p>
        </div>
        <div className="input-fields">
          {action === "Log In" ? (
            <div></div>
          ) : (
            <div className="input">
              <img src={nameIcon} alt="name-input-img" />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="input">
            <img src={emailIcon} alt="email-input-img" />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="password-input-img" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
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
              action === "Sign Up" ? setCount(1) : setAction("Sign Up");
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
