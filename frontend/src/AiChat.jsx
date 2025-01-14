import React, { useState } from "react";
import { useEffect } from "react";
import "./AiChat.css";

const startMessage = async () => {
  
}

const fetchStoredMessages = async () => {
  const access_token = localStorage.getItem('access_token');
  console.log("-------- ", access_token)
  let response;
  response = await fetch('http://localhost:8000/api/user-ai-messages/', {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${access_token}`,
    }
  });
  let res;
  if (response.ok) {
    res = await response.json();
    return res;
  }
  else {
    console.warn('Could not fetch data from server');
  }
}


function AiChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [aiMessage, setAiMessage] = useState([]);

  function handleSubmit() {
    setUserMessage((prev) => [...prev, input]);
    startMessage();
    setInput("");
  }

  useEffect(() => {
    fetchStoredMessages().then(message => {
      setMessages(message);
    });
  }, []);

  return (
    <div className="main-div">
      <div className="chat-container">
        {/* Old messages in first landing */}
        {messages.map((message, index) => {
          console.log('dkhaal');
          return (
            <React.Fragment key={index}>
              <div className="user-message">
                <p>{message.userMessages}</p>
              </div>
              <div className="ai-message">
                <p>{message.aiMessages}</p>
              </div>
            </React.Fragment>
          );
        })}
        {/* New messages from user */}
        {userMessage.map((message, index) => {
          console.log('message from USER');
          return (
            <React.Fragment key={index}>
              <div className="user-message">
                <p>{message}</p>
              </div>
            </React.Fragment>
          );
        })}
        {/* New messages from Ai */}
        {aiMessage.map((message, index) => {
          console.log('message from AI');
          return (
            <React.Fragment key={index}>
              <div className="ai-message">
                <p>{message}</p>
              </div>
            </React.Fragment>
          );
        })}

        {/* <div className="ai-message">
                  <p>This is the ai response</p>
              </div>
              <div className="user-message">
                  <p>User message</p>
              </div> */}
      </div>
      <div className="form-div">
        <input
          className="prompt-input"
          placeholder="Type your message here..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input) {
              console.log('Enter pressed')
              handleSubmit();
            }
          }}
        />
        <button
          className="submit-button"
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AiChat;
