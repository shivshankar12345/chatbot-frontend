import React, { useState, useEffect } from 'react';

interface Message {
  sender: string;
  text: string;
}

const ChatbotWithThemes: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [botResponse, setBotResponse] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Apply theme class to body on mount and theme toggle
  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-gray-900' : 'bg-white';
  }, [isDarkMode]);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessage = { sender: 'User', text: userInput };
    setMessages((prev) => [...prev, newMessage]);
    setUserInput('');
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
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col h-screen w-screen transition-all ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
      }`}
    >
      {/* Header Section */}
      <header
        className={`p-4 text-center shadow-lg rounded-t-xl transition duration-300 ${
          isDarkMode
            ? 'bg-gray-800 border-b border-gray-700'
            : 'bg-gradient-to-r from-green-400 to-blue-500 border-b border-blue-400'
        }`}
      >
        <h1 className="text-3xl font-extrabold tracking-widest">CHATBOT</h1>
        <button
          onClick={toggleTheme}
          className={`mt-2 p-2 rounded-full focus:outline-none transition-transform transform ${
            isDarkMode ? 'hover:bg-gray-700' : 'hover:scale-110 hover:bg-blue-300'
          }`}
        >
          {isDarkMode ? '🌞' : '🌙'} {/* Sun and Moon emojis for theme toggle */}
        </button>
      </header>

      {/* Centered Bot Response */}
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

      {/* Features Section */}
      <div className="grid grid-cols-4 gap-6 mt-8 px-4">
        {[
          { text: 'Create a Cartoon Pet', emoji: '🐶' },
          { text: 'What can ChatGPT Do?', emoji: '🤖' },
          { text: 'Find a Photo’s Decade', emoji: '📸' },
          { text: 'Write a Game Report', emoji: '📄' },
        ].map((feature, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-6 rounded-xl border shadow-md transition transform hover:scale-105 ${
              isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300 shadow-gray-300'
            }`}
          >
            <div className="text-6xl">{feature.emoji}</div>
            <p className="mt-2 text-center text-lg font-bold tracking-wide">
              {feature.text}
            </p>
          </div>
        ))}
      </div>

      {/* Chat Messages Section */}
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

      {/* Chat Input Section */}
      <div
        className={`flex items-center mt-4 p-4 border-t rounded-b-xl transition ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300 shadow-md'
        }`}
      >
        <textarea
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className={`flex-grow p-3 rounded-lg resize-none transition focus:outline-none ${
            isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-gray-100 text-gray-800 border border-gray-300'
          }`}
        />
        <button
          onClick={handleSendMessage}
          className={`ml-3 px-6 py-3 rounded-lg shadow-lg transition-transform duration-300 ${
            isDarkMode
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-blue-400 hover:bg-blue-500'
          } focus:outline-none`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatbotWithThemes;
