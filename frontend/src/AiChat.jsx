import { useState } from "react";
import "./AiChat.css";

const fetching = async () => {

}

function AiChat() {
  const [messages, setMessages] = useState([])

  

  return (
      <div className="main-div">
          <div className="chat-container">
              <div className="ai-message">
                  <p>This is the ai response</p>
              </div>
              <div className="user-message">
                  <p>User message</p>
              </div>
          </div>
        <div className="form-div">
          <input
            className="prompt-input"
            placeholder="Type your message here..."
            type="text"
          />
          <button className="submit-button">Submit</button>
        </div>
    </div>
  );
}

export default AiChat;
