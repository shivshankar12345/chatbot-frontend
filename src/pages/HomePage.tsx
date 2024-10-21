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

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState<ConversationNode | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const initializeConversation = () => {
    const businessName = localStorage.getItem("businessName");
    if (!businessName) {
      navigate("/");
      return;
    }

    getBotConfiguration(businessName)
      .then((res) => {
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

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleOptionClick = (optionKey: string) => {
    if (!currentNode || !currentNode.options[optionKey]) return;

    const selectedOption = currentNode.options[optionKey];
    setMessages((prev) => [
      ...prev,
      { sender: "User", text: selectedOption.question },
    ]);

    if (selectedOption.answer) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "Chatbot",
          text: selectedOption.answer ?? "No response available",
        },
      ]);

      if (Object.keys(selectedOption.options).length > 0) {
        setCurrentNode(selectedOption);
      } else {
        window.alert("No more options available. Restarting the conversation.");
        initializeConversation();
      }
    } else {
      window.alert(
        "No further responses available. Restarting the conversation."
      );
      initializeConversation();
    }
  };

  return (
    <div
      className={`flex flex-col h-screen w-screen transition-all ${
        isDarkMode ? "bg-gray-900 text-black" : "bg-white text-gray-800"
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
            onClick={() =>
              navigate(
                `/chatbot/admin/${localStorage.getItem(
                  "businessName"
                )}/question-answers`
              )
            }
            className={`px-4 py-2 rounded-full border-2 transition duration-300 ${
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                : "border-blue-500 bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            Configure
          </button>
          <button
            onClick={() => navigate(`/`)}
            className={`px-4 py-2 rounded-full border-2 transition duration-300 ${
              isDarkMode
                ? "border-gray-600 bg-gray-800 text-white hover:bg-gray-700"
                : "border-blue-500 bg-white text-blue-500 hover:bg-blue-100"
            }`}
          >
            Main Page
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

export default HomePage;
