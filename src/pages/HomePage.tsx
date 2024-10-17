import React, { useState, useEffect, useRef } from "react";
import QuickOptions from "../components/QuickOptions"; // Ensure you have this component
import { useNavigate } from "react-router-dom";
import { getBotConfiguration } from "../apis/chatApis";

interface Message {
  sender: string;
  text: string | undefined;
}

export interface ConversationNode {
  question: string;
  answer?: string;
  options: {
    [key: string]: ConversationNode;
  };
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<ConversationNode | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const initializeConversation = () => {
    // Fetch bot configuration
    getBotConfiguration("Business1")
      .then((res) => {
        console.log("Conversation from backend", res.data);
        const initialNode = res.data.data;
        setCurrentNode(initialNode);
        setMessages([{ sender: "Chatbot", text: initialNode.question }]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    initializeConversation();
  }, []);

  // Ensure smooth scrolling
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleOptionClick = (optionKey: string) => {
    if (!currentNode || !currentNode.options[optionKey]) return;

    const selectedOption = currentNode.options[optionKey];

    // Add the user's selection to the messages
    setMessages((prev) => [
      ...prev,
      { sender: "User", text: selectedOption.question },
    ]);

    // If there's an answer from the bot, add it to the messages
    if (selectedOption.answer) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Chatbot",
          text: selectedOption.answer ?? "No response available",
        },
      ]);

      // Check if there are more options for the next question
      if (Object.keys(selectedOption.options).length > 0) {
        setCurrentNode(selectedOption); // Move to the next node
      } else {
        // No more options, alert the user and reset the conversation
        window.alert("No more options available. Restarting the conversation.");
        initializeConversation(); // Reinitialize the conversation
      }
    } else {
      // If there's no answer or options, alert and reset the conversation
      window.alert(
        "No further responses available. Restarting the conversation."
      );
      initializeConversation(); // Reset the conversation to the initial state
    }
  };

  return (
    <div
      className={`flex flex-col h-screen w-screen transition-all ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <header
        className={`flex justify-between items-center p-4 shadow-lg rounded-t-xl transition duration-300 ${
          isDarkMode
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-gradient-to-r from-green-400 to-blue-500 border-b border-blue-400"
        }`}
      >
        <h1 className="text-3xl font-extrabold tracking-widest text-center flex-grow">
          Chatbot
        </h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className={`p-2 rounded-full focus:outline-none transition-transform transform ${
              isDarkMode
                ? "hover:bg-gray-700"
                : "hover:scale-110 hover:bg-blue-300"
            }`}
          >
            {isDarkMode ? "🌞" : "🌙"}
          </button>
          <button
            onClick={() => navigate("/admin/question-answers")}
            className={`px-4 py-2 rounded-full border-2 transition duration-300 ${
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                : "border-blue-500 bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            Configure
          </button>
        </div>
      </header>

      <div
        className="flex-grow mt-6 p-6 rounded-lg shadow-inner overflow-y-auto space-y-4"
        id="messageContainer"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.sender === "Chatbot" ? "bg-gray-200" : "bg-blue-100"
            }`}
          >
            <span className="block text-sm font-medium">{message.sender}</span>
            <p className="mt-2">{message.text}</p>
          </div>
        ))}
        <div ref={messageEndRef}></div>
      </div>

      {/* QuickOptions Section */}
      {currentNode && (
        <QuickOptions
          features={Object.keys(currentNode.options).map((key) => ({
            id: key,
            text: currentNode.options[key].question,
          }))}
          isDarkMode={isDarkMode}
          onOptionClick={handleOptionClick}
        />
      )}
    </div>
  );
};

export default Chatbot;
