import { auth } from "./auth.js";
import { useEffect } from "react";
import AiChat from "./AiChat.jsx";
import React, { useState } from "react";
import LoginSignup from "./LoginSignup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await auth();
      setIsLogged(isAuth);
    };
    checkAuth();
  }, []);

  return (
    <>
      {isLogged === false ? (
        <LoginSignup setIsLogged={setIsLogged} />
      ) : (
        <AiChat />
      )}
    </>
  );
}

export default App;
