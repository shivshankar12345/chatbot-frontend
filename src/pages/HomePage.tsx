import React, { useState, useEffect } from "react";
import QuickOptions from "../components/QuickOptions"; // Ensure you have this component
import { dummyConversationTree } from "../config/config";

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
      <header className="flex justify-between items-center p-4 border-b border-gray-300">
        <h1 className="text-xl font-bold">{dummyBusiness.name}</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          Toggle Dark Mode
        </button>
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
