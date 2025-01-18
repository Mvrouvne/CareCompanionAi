import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import "./AiChat.css";

async function startConversation(socketRef, setNewMessages) {
  const access_token = localStorage.getItem("access_token");
  socketRef.current = new WebSocket(
    `ws://localhost:8000/ws/user-ai-socket/?Token=${access_token}`
  );
  socketRef.current.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    let string = { type: "ai", input: data.ai_response };
    setNewMessages((prev) => [...prev, string]);
  });
}

const fetchStoredMessages = async () => {
  const access_token = localStorage.getItem("access_token");
  let response;
  response = await fetch("http://localhost:8000/api/user-ai-messages/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  let res;
  if (response.ok) {
    res = await response.json();
    return res;
  } else {
    console.warn("Could not fetch data from server");
  }
};

function AiChat() {
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newMessages, setNewMessages] = useState([]);

  useEffect(() => {
    console.log("Use Effect!!!");
    (async () => {
      await startConversation(socketRef, setNewMessages);
    })();
    fetchStoredMessages().then((message) => {
      setMessages(message);
    });
  }, []);

  function handleSubmit() {
    if (input) {
      let string = { type: "user", input: input };
      setNewMessages((prev) => [...prev, string]);
      console.log("ss = ", socketRef.current);
      socketRef.current.send(
        JSON.stringify({
          user_prompt: input,
        })
      );
      setInput("");
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [newMessages]);

  return (
    <div className="main-div">
      <div className="chat-container" ref={chatContainerRef}>
        {/* Old messages in first landing */}
        {messages.map((message, index) => {
          console.log("dkhaal");
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
        {newMessages.map((message, index) => {
          console.log("message from USER", message.input);

          return (
            <React.Fragment key={index}>
              <div
                className={
                  message.type === "user" ? "user-message" : "ai-message"
                }
              >
                <p>{message.input}</p>
              </div>
            </React.Fragment>
          );
        })}
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
              console.log("Enter pressed");
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
