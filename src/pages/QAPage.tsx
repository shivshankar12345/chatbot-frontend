import React, { useState } from 'react';
import { FaPlus, FaTrash, FaSave, FaEdit, FaSun, FaMoon } from 'react-icons/fa';

interface QAItem {
  question: string;
  answer: string;
}

interface Business {
  name: string;
  qaList: QAItem[];
}

const ChatbotQAAdmin: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([
    { name: '', qaList: [{ question: '', answer: '' }] },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle Changes in Individual Inputs
  const handleBusinessChange = (index: number, value: string) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[index].name = value;
    setBusinesses(updatedBusinesses);
  };

  const handleInputChange = (
    businessIndex: number,
    qaIndex: number,
    field: 'question' | 'answer',
    value: string
  ) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[businessIndex].qaList[qaIndex][field] = value;
    setBusinesses(updatedBusinesses);
  };

  // Add New Question-Answer Pair
  const addNewQA = (businessIndex: number) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[businessIndex].qaList.push({ question: '', answer: '' });
    setBusinesses(updatedBusinesses);
  };

  // Remove a Question-Answer Pair
  const removeQA = (businessIndex: number, qaIndex: number) => {
    const updatedBusinesses = [...businesses];
    updatedBusinesses[businessIndex].qaList.splice(qaIndex, 1);
    setBusinesses(updatedBusinesses);
  };

  // Add New Business
  const addNewBusiness = () => {
    setBusinesses([...businesses, { name: '', qaList: [{ question: '', answer: '' }] }]);
  };

  // Handle Save Action
  const handleSave = () => {
    console.log('Saved Businesses:', businesses);
    alert('Businesses and Q&A saved successfully!');
  };

  return (
    <div className={`p-6 max-w-2xl mx-auto ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6">Chatbot Q&A Admin</h1>
      <button onClick={toggleDarkMode} className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-md flex items-center">
        {isDarkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />}
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      {businesses.map((business, businessIndex) => (
        <div key={businessIndex} className="mb-6 border p-4 rounded-md shadow-md bg-gray-100">
          <div className="mb-4">
            <label className="block font-bold mb-1">Business Name:</label>
            <input
              type="text"
              value={business.name}
              onChange={(e) => handleBusinessChange(businessIndex, e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter Business Name"
            />
          </div>

          {business.qaList.map((qa, qaIndex) => (
            <div key={qaIndex} className="mb-4 border p-4 rounded-md bg-gray-200 shadow-sm">
              <div className="flex justify-between mb-2">
                <div className="flex-grow mr-2">
                  <label className="block font-bold mb-1">Question {qaIndex + 1}:</label>
                  <input
                    type="text"
                    value={qa.question}
                    onChange={(e) => handleInputChange(businessIndex, qaIndex, 'question', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Question"
                  />
                </div>
                <div className="flex-grow ml-2">
                  <label className="block font-bold mb-1">Answer {qaIndex + 1}:</label>
                  <input
                    type="text"
                    value={qa.answer}
                    onChange={(e) => handleInputChange(businessIndex, qaIndex, 'answer', e.target.value)}
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter Answer"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => removeQA(businessIndex, qaIndex)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                  disabled={business.qaList.length === 1} // Disable if only one pair left
                >
                  <FaTrash className="mr-1" /> Remove
                </button>
                <button
                  onClick={() => {
                    // Edit logic can be implemented here if needed
                  }}
                  className="mt-2 ml-2 px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() => addNewQA(businessIndex)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center"
          >
            <FaPlus className="mr-1" /> Add Question
          </button>
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

export default ChatbotQAAdmin;
