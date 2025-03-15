import React, { useState } from "react";
import axios from "axios";
import "./css/chatbot.css";

const Chatbot = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { type: "user", text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");

    const botThinkingMessage = { type: "bot", text: "Thinking..." };
    setMessages((prevMessages) => [...prevMessages, botThinkingMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chatbot", {
        message: userInput,
      });

      const botResponseMessage = {
        type: "bot",
        text: response.data.response,
      };

      setMessages((prevMessages) =>
        prevMessages.slice(0, prevMessages.length - 1).concat(botResponseMessage)
      );
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        type: "bot",
        text: "Sorry, I couldn't process your request. Please try again.",
      };

      setMessages((prevMessages) =>
        prevMessages.slice(0, prevMessages.length - 1).concat(errorMessage)
      );
    }
  };

  return (
    <div id="chatbot">
      <button id="chatbot-toggle" onClick={toggleChatbot}>
        💬
      </button>
      {isChatbotOpen && (
        <div id="chatbot-box">
          <div id="chatbot-header">
            <h3>Government Assistant</h3>
            <button onClick={toggleChatbot}>✖</button>
          </div>
          <div id="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={message.type === "bot" ? "bot-message" : "user-message"}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div id="chatbot-input">
            <input
              type="text"
              id="user-input"
              placeholder="Type your message here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button id="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
