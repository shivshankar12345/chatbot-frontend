import React, { useState, useEffect } from "react";
import QuickOptions from "../components/QuickOptions"; // Ensure you have this component
import { dummyConversationTree } from "../config/config";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: string;
  text: string;
}

export interface ConversationNode {
  question: string;
  answer: string; // Added answer field
  options: {
    [key: string]: ConversationNode;
  };
}

const dummyBusiness = {
  name: "My Business",
  conversationTree: dummyConversationTree,
};

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNode, setCurrentNode] = useState(
    dummyBusiness.conversationTree
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Initialize conversation with the first question
    setMessages([
      { sender: "Chatbot", text: dummyBusiness.conversationTree.question },
    ]);
  }, []);

  const handleOptionClick = (optionKey: string) => {
    const selectedOption = currentNode.options[optionKey];

    if (selectedOption) {
      // Add the user's selection
      setMessages((prev) => [
        ...prev,
        { sender: "User", text: selectedOption.question },
      ]);

      // Add the bot's answer for the selected option
      setMessages((prev) => [
        ...prev,
        { sender: "Chatbot", text: selectedOption.answer },
      ]);

      // If the selected option has further questions, present the next one
      const nextOptionKeys = Object.keys(selectedOption.options);
      if (nextOptionKeys.length > 0) {
        const nextQuestion = selectedOption.options[nextOptionKeys[0]].question;
        setMessages((prev) => [
          ...prev,
          { sender: "Chatbot", text: nextQuestion },
        ]);
        // Update the current node to the selected option
        setCurrentNode(selectedOption);
      } else {
        // If no more options are left, go back to the start
        alert("No more options available. Returning to the start...");
        setCurrentNode(dummyBusiness.conversationTree);
        setMessages([
          { sender: "Chatbot", text: dummyBusiness.conversationTree.question },
        ]);
      }
    } else {
      // If no more options are left, go back to the start
      alert("No more options available. Returning to the start...");
      setCurrentNode(dummyBusiness.conversationTree);
      setMessages([
        { sender: "Chatbot", text: dummyBusiness.conversationTree.question },
      ]);
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
          {dummyBusiness.name}
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
            onClick={() => navigate("/admin")}
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

      <div className="flex-grow mt-6 p-6 rounded-lg shadow-inner overflow-y-auto space-y-4">
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
      </div>

      {/* QuickOptions Section */}
      <QuickOptions
        features={Object.keys(currentNode.options).map((key) => ({
          id: key,
          text: currentNode.options[key].question,
        }))}
        isDarkMode={isDarkMode}
        onOptionClick={handleOptionClick}
      />
    </div>
  );
};

export default Chatbot;
