import React, { useState } from "react";
import { FaPlus, FaSave, FaSun, FaMoon } from "react-icons/fa";
import { addBotConfiguration } from "../apis/chatApis";

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
  const [businesses, setBusinesses] = useState<Business[]>([
    { name: "", conversationTree: { question: "", options: {} } },
  ]);

  // console.log("Business", businesses);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Business Name Change
  const handleBusinessChange = (index: number, value: string) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[index].name = value;
    setBusinesses(updatedBusinesses);
  };

  // Handle Question Change
  const handleQuestionChange = (
    businessIndex: number,
    questionPath: string[],
    value: string
  ) => {
    const updatedBusinesses = [...businesses];
    let currentNode = updatedBusinesses[businessIndex].conversationTree;

    questionPath.forEach((step) => {
      currentNode = currentNode.options[step]; // Traverse to the current node based on the path
    });

    currentNode.question = value; // Update the question at the current node
    setBusinesses(updatedBusinesses);
  };

  // Handle Adding Option for a Question
  const addOptionToQuestion = (
    businessIndex: number,
    questionPath: string[],
    optionLabel: string
  ) => {
    const updatedBusinesses = [...businesses];
    let currentNode = updatedBusinesses[businessIndex].conversationTree;

    questionPath.forEach((step) => {
      currentNode = currentNode.options[step]; // Traverse to the current node based on the path
    });

    if (!currentNode.options[optionLabel]) {
      currentNode.options[optionLabel] = { question: "", options: {} }; // Add a new node for this option
    }

    setBusinesses(updatedBusinesses);
  };

  // Add a New Business
  const addNewBusiness = () => {
    setBusinesses([
      ...businesses,
      { name: "", conversationTree: { question: "", options: {} } },
    ]);
  };

  // Handle Save Action
  const handleSave = async () => {
    console.log("Business", businesses);
    console.log("Saved Businesses:", businesses);
    // You can send the `businesses` data to your backend here
    // For example, using fetch:
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
      className={`p-6 max-w-2xl mx-auto ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">Chatbot Q&A Admin</h1>
      <button
        onClick={toggleDarkMode}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md flex items-center"
      >
        {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </button>

      {businesses.map((business, businessIndex) => (
        <div
          key={businessIndex}
          className={`mb-6 border p-4 rounded-md shadow-md ${
            isDarkMode ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <div className="mb-4">
            <label className="block font-bold mb-1">Business Name:</label>
            <input
              type="text"
              value={business.name}
              onChange={(e) =>
                handleBusinessChange(businessIndex, e.target.value)
              }
              className="w-full p-2 border rounded-md"
              placeholder="Enter Business Name"
            />
          </div>

          {/* Render the conversation tree */}
          <ConversationNodeComponent
            businessIndex={businessIndex}
            node={business.conversationTree}
            onQuestionChange={handleQuestionChange}
            addOption={addOptionToQuestion}
            path={[]} // Starting path
            isDarkMode={isDarkMode}
          />
        </div>
      ))}

      <button
        onClick={addNewBusiness}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition flex items-center"
      >
        <FaPlus className="mr-1" /> Add Business
      </button>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-4 ml-4 px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition flex items-center"
      >
        <FaSave className="mr-1" /> Save All
      </button>
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
  addOption,
  path,
  isDarkMode,
}) => {
  const [option1, setOption1] = useState(""); // For the first option
  const [option2, setOption2] = useState(""); // For the second option

  const handleAddOptions = () => {
    if (option1) addOption(businessIndex, path, option1);
    if (option2) addOption(businessIndex, path, option2);
    setOption1(""); // Clear the input after adding
    setOption2(""); // Clear the input after adding
  };

  return (
    <div
      className={`mb-4 border p-4 rounded-md shadow-sm ${
        isDarkMode ? "bg-gray-600" : "bg-gray-200"
      }`}
    >
      <label className="block font-bold mb-1">Question:</label>
      <input
        type="text"
        value={node.question}
        onChange={(e) => onQuestionChange(businessIndex, path, e.target.value)}
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Enter Question"
      />

      <label className="block font-bold mb-1">Options:</label>
      {Object.keys(node.options).map((optionLabel) => (
        <div key={optionLabel} className="mb-2">
          <span className="font-semibold">{optionLabel}</span>
          <ConversationNodeComponent
            businessIndex={businessIndex}
            node={node.options[optionLabel]}
            onQuestionChange={onQuestionChange}
            addOption={addOption}
            path={[...path, optionLabel]} // Append the optionLabel to the path
            isDarkMode={isDarkMode} // Pass dark mode to nested nodes
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-bold mb-1">Add Options:</label>
        <input
          type="text"
          value={option1}
          onChange={(e) => setOption1(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Option 1"
        />
        <input
          type="text"
          value={option2}
          onChange={(e) => setOption2(e.target.value)}
          className="w-full p-2 border rounded-md mb-2"
          placeholder="Option 2"
        />
      </div>

      <button
        onClick={handleAddOptions}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
      >
        <FaPlus className="mr-1" /> Add Options
      </button>
    </div>
  );
};

export default ChatbotQAAdmin;
