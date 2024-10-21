import React, { useState } from "react";
import { FaSave, FaSun, FaMoon } from "react-icons/fa";
import { addBotConfiguration } from "../apis/chatApis";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

interface ConversationNode {
  question: string;
  answer?: string; // Optional since it could be dynamic
  options: { [key: string]: ConversationNode }; // Tree structure for options leading to other nodes
}

interface Business {
  name: string;
  conversationTree: ConversationNode;
}

const ChatbotQAAdmin: React.FC = () => {
  const navigate = useNavigate();
  const { businessName } = useParams();
  const [businesses, setBusinesses] = useState<Business[]>([
    { name: "", conversationTree: { question: "", options: {} } },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBusinessChange = (index: number, value: string) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[index].name = value;
    setBusinesses(updatedBusinesses);
  };

  const handleQuestionChange = (
    businessIndex: number,
    questionPath: string[],
    value: string
  ) => {
    const updatedBusinesses = [...businesses];
    let currentNode = updatedBusinesses[businessIndex].conversationTree;

    questionPath.forEach((step) => {
      currentNode = currentNode.options[step];
    });

    currentNode.question = value;
    setBusinesses(updatedBusinesses);
  };

  const handleAnswerChange = (
    businessIndex: number,
    questionPath: string[],
    value: string
  ) => {
    const updatedBusinesses = [...businesses];
    let currentNode = updatedBusinesses[businessIndex].conversationTree;

    questionPath.forEach((step) => {
      currentNode = currentNode.options[step];
    });

    currentNode.answer = value;
    setBusinesses(updatedBusinesses);
  };

  const addOptionToQuestion = (
    businessIndex: number,
    questionPath: string[],
    optionLabel: string
  ) => {
    const updatedBusinesses = [...businesses];
    let currentNode = updatedBusinesses[businessIndex].conversationTree;

    questionPath.forEach((step) => {
      currentNode = currentNode.options[step];
    });

    if (!currentNode.options[optionLabel]) {
      currentNode.options[optionLabel] = {
        question: "",
        answer: "",
        options: {},
      };
    }

    setBusinesses(updatedBusinesses);
  };

  const handleSave = async () => {
    await addBotConfiguration(businesses)
      .then((data) => {
        console.log("Data", data);
        location.reload();
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-lg transition-all w-full h-full ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Chatbot Q&A Admin</h1>
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate("/")}
          className="px-3 py-2 border border-blue-500 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Go To Home
        </button>
        <button
          onClick={toggleDarkMode}
          className="px-3 py-2 border border-gray-500 bg-gray-500 text-white rounded-md flex items-center hover:bg-gray-600 transition duration-200"
        >
          {isDarkMode ? (
            <FaSun className="mr-2" />
          ) : (
            <FaMoon className="mr-2" />
          )}
          Toggle {isDarkMode ? "Light" : "Dark"} Mode
        </button>
      </div>

      {businesses.map((business, businessIndex) => (
        <div
          key={businessIndex}
          className={`mb-6 border p-4 rounded-md shadow-md ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="mb-4">
            <label className="block font-bold mb-1 ">Business Name :</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) =>
                handleBusinessChange(businessIndex, e.target.value)
              }
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-not-allowed"
              placeholder="Enter Business Name"
              disabled
            />
          </div>

          {/* Render the conversation tree */}
          <ConversationNodeComponent
            businessIndex={businessIndex}
            node={business.conversationTree}
            onQuestionChange={handleQuestionChange}
            onAnswerChange={handleAnswerChange}
            addOption={addOptionToQuestion}
            path={[]} // Starting path
            isDarkMode={isDarkMode}
          />
        </div>
      ))}
      <div className="flex justify-between mt-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="px-3 py-2 border border-purple-500 bg-purple-500 text-white rounded-md flex items-center hover:bg-purple-600 transition duration-200"
        >
          <FaSave className="mr-1" /> Save All
        </button>
      </div>
    </div>
  );
};

// Component to handle rendering of each conversation node recursively
interface ConversationNodeProps {
  businessIndex: number;
  node: ConversationNode;
  onQuestionChange: (
    businessIndex: number,
    questionPath: string[],
    value: string
  ) => void;
  onAnswerChange: (
    businessIndex: number,
    questionPath: string[],
    value: string
  ) => void;
  addOption: (
    businessIndex: number,
    questionPath: string[],
    optionLabel: string
  ) => void;
  path: string[]; // Path to this node in the tree
  isDarkMode: boolean; // Pass dark mode to apply to nested components
}

const ConversationNodeComponent: React.FC<ConversationNodeProps> = ({
  businessIndex,
  node,
  onQuestionChange,
  onAnswerChange,
  addOption,
  path,
  isDarkMode,
}) => {
  const [optionLabel1, setOptionLabel1] = useState("");
  const [optionLabel2, setOptionLabel2] = useState("");
  const [isFirstOptionDisabled, setIsFirstOptionDisabled] = useState(false); // Track if first option is disabled

  const handleAddOption = (optionLabel: string) => {
    if (optionLabel.trim() === "") return; // Prevent empty option labels
    addOption(businessIndex, path, optionLabel); // Add new option
    if (!isFirstOptionDisabled) {
      setIsFirstOptionDisabled(true); // Disable the first option input after adding
    }
  };

  return (
    <div
      className={`mb-4 border p-4 rounded-md shadow-sm ${
        isDarkMode ? "bg-gray-600" : "bg-gray-200"
      }`}
      style={{ marginLeft: path.length * 20 }} // Indent nested options
    >
      <label className="block font-bold mb-1">Question:</label>
      <input
        type="text"
        value={node.question}
        onChange={(e) => onQuestionChange(businessIndex, path, e.target.value)}
        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Question"
      />

      <label className="block font-bold mb-1">Answer:</label>
      <input
        type="text"
        value={node.answer}
        onChange={(e) => onAnswerChange(businessIndex, path, e.target.value)}
        className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter Answer"
      />

      <label className="block font-bold mb-1">Option Labels:</label>
      <div className="flex mb-4">
        <input
          type="text"
          value={optionLabel1}
          onChange={(e) => setOptionLabel1(e.target.value)}
          className={`w-full p-2 border rounded-md mr-2 ${
            isFirstOptionDisabled ? "bg-gray-300 cursor-not-allowed" : ""
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Enter Option Label 1"
          disabled={isFirstOptionDisabled} // Disable if first option is disabled
        />
        <input
          type="text"
          value={optionLabel2}
          onChange={(e) => setOptionLabel2(e.target.value)}
          className="w-full p-2 border rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Option Label 2"
        />
        <button
          onClick={() => {
            handleAddOption(optionLabel1);
            handleAddOption(optionLabel2);
            // Note: option fields will not be reset
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Add Options
        </button>
      </div>

      {/* Render options */}
      <div className="mt-4">
        {Object.keys(node.options).map((key) => (
          <ConversationNodeComponent
            key={key}
            businessIndex={businessIndex}
            node={node.options[key]}
            onQuestionChange={onQuestionChange}
            onAnswerChange={onAnswerChange}
            addOption={addOption}
            path={[...path, key]} // Update the path for child nodes
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatbotQAAdmin;
