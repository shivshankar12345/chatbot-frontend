import React, { useState } from 'react';

const Chatbot: React.FC = () => {
    //const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
    const [userInput, setUserInput] = useState('');

    const handleSendMessage = () => {
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value); 

    };

    return (
        <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-gray-200 to-gray-400">
            <header className="p-4 bg-blue-600 text-white rounded-t-lg">
                <h1 className="text-lg font-semibold">Chatbot</h1>
            </header>
            <div className="flex-grow p-4 overflow-y-auto">
            </div>
            <div className="flex justify-center p-4 bg-white border-t border-gray-300">
                <div className="flex w-full max-w-xl"> {/* Center the input area */}
                    <textarea
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none overflow-hidden"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 mt-3 px-4 py-2 h-10 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
