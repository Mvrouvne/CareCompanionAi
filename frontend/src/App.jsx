import React, { useState } from "react";
import LoginSignup from "./LoginSignup.jsx";
import AiChat from './AiChat.jsx'

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <>
      {isLogged === false ? <LoginSignup setIsLogged={setIsLogged} /> : <AiChat />}
    </>
  );
}

export default App;
