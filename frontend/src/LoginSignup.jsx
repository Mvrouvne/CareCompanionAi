import nameIcon from "./assets/name-icon.png";
import emailIcon from "./assets/email-icon.png";
import passwordIcon from "./assets/password-icon.png";
import "./LoginSignup.css";
import React, { useState, useEffect } from "react";

function LoginSignup(props) {
  const [action, setAction] = useState("Log In");
  const [count, setCount] = useState(0);
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Error, setError] = useState("");
  // const [input, setInput] = useState("");

  useEffect(() => {
    if (count) {
      let res;
      let parsed;
      let body = JSON.stringify({
        username: Username,
        email: Email,
        password: Password,
      });
      let path = "auth/users/";
      if (action === "Log In") {
        path = "auth/jwt/create";
        body = JSON.stringify({
          username: Username,
          password: Password,
        });
      }
      const fetching = async () => {
        const response = await fetch(`http://localhost:8000/${path}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `${body}`,
        });
        setPassword("");
        res = await response.json();
        parsed = JSON.stringify(res);
        console.log(res);
        if (!response.ok) {
          setError(parsed);
        } else if (response.ok && action === 'Sign Up') {
          setAction("Log In");
          setError("");
        } else if (response.ok && action === 'Log In') {
            props.setIsLogged(true);
        }
      };
      fetching();
      setCount(0);
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
              <img src={emailIcon} alt="email-input-img" />
              <input
                type="email"
                value={Email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}
          <div className="input">
            <img src={nameIcon} alt="name-input-img" />
            <input
              type="text"
              value={Username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <img src={passwordIcon} alt="password-input-img" />
            <input
              type="password"
              value={Password}
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
              if (action === "Sign Up") setCount(1);
              else {
                setAction("Sign Up");
                setError("");
              }
            }}
          >
            Sign up
          </button>
          <button
            className={action === "Log In" ? "submit" : "submit ocean-blue"}
            onClick={() => {
              if (action === "Log In") setCount(1);
              else {
                setAction("Log In");
                setError("");
              }
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
