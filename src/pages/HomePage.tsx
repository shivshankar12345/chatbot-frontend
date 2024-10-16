import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QuickOptions from '../components/QuickOptions';

interface Message {
  sender: string;
  text: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [botResponse, setBotResponse] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();

  const features = [
    { text: 'Create a Cartoon Pet', emoji: '🐶' },
    { text: 'What can ChatGPT Do?', emoji: '🤖' },
    { text: 'Find a Photo’s Decade', emoji: '📸' },
    { text: 'Write a Game Report', emoji: '📄' },
  ];

  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-gray-900' : 'bg-white';
  }, [isDarkMode]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: 'User', text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setTimeout(() => {
      const response = `Processing: ${userInput}`;
      setBotResponse(response);

      setTimeout(() => {
        setBotResponse('');
        const botMessage = { sender: 'Chatbot', text: `You said: ${userInput}` };
        setMessages((prev) => [...prev, botMessage]);
      }, 2000);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
    autoResizeTextarea();
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [userInput]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`flex flex-col h-screen w-screen transition-all ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <header
        className={`p-4 text-center shadow-lg rounded-t-xl flex justify-between items-center transition duration-300 ${
          isDarkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gradient-to-r from-green-400 to-blue-500 border-b border-blue-400'
        }`}
      >
        <h1 className="text-3xl font-extrabold tracking-widest">CHATBOT</h1>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full focus:outline-none transition-transform transform ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:scale-110 hover:bg-blue-300'
            }`}
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>

          {/* Configure Chatbot Button */}
          <button
            onClick={() => navigate('/admin')}
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-transform ${
              isDarkMode ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-400 hover:bg-purple-500 text-black'
            }`}
          >
            Configure Chatbot
          </button>
        </div>
      </header>

      {botResponse && (
        <div className="mt-4 text-center">
          <div
            className={`inline-block px-6 py-4 rounded-xl text-xl font-bold shadow-lg animate-pulse transition duration-300 ${
              isDarkMode ? 'bg-purple-700' : 'bg-yellow-300 border border-gray-300 shadow-gray-400'
            }`}
          >
            {botResponse}
          </div>
        </div>
      )}

      <QuickOptions
        features={features}
        isDarkMode={isDarkMode}
        onOptionClick={(option) => setMessages((prev) => [...prev, { sender: 'Bot', text: `You selected: ${option}` }])}
      />

      <div
        className={`flex-grow mt-6 p-6 rounded-lg shadow-inner overflow-y-auto space-y-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg max-w-lg border shadow-md transition-transform duration-300 ${
              message.sender === 'User'
                ? isDarkMode
                  ? 'bg-blue-600 text-white border-blue-500 shadow-gray-500'
                  : 'bg-blue-400 text-white border-blue-300 shadow-gray-300'
                : isDarkMode
                ? 'bg-purple-500 text-black border-purple-400 shadow-gray-500'
                : 'bg-purple-200 text-black border-purple-300 shadow-gray-200'
            }`}
          >
            <span className="block text-sm font-medium">{message.sender}</span>
            <p className="mt-2">{message.text}</p>
          </div>
        ))}
      </div>

      <div
        className={`flex items-center mt-4 p-4 border-t rounded-b-xl transition ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 shadow-md'
        }`}
      >
        <textarea
          ref={textareaRef}
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={`flex-grow p-3 rounded-lg resize-none transition focus:outline-none ${
            isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}
          style={{ maxHeight: '150px', minHeight: '40px' }}
        />
        <button
          onClick={handleSendMessage}
          className={`ml-3 px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 ${
            isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 hover:bg-blue-500'
          } focus:outline-none`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
