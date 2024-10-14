import React, { useState, useRef, useEffect } from 'react';
import QuickOptions from '../components/QuickOptions'; // Import the new QuickOptions component

const Chatbot: React.FC = () => {
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]); // For tracking conversation
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSendMessage = () => {
        if (userInput.trim() !== '') {
            setMessages([...messages, { sender: 'User', text: userInput }]); // Add user message to chat
            setUserInput(''); // Clear input after sending the message
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height when cleared
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset the height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content
        }
    };

    useEffect(() => {
        autoResizeTextarea(); // Ensure it auto-resizes on initial render
    }, [userInput]);

    const handleOptionClick = (option: string) => {
        setMessages([...messages, { sender: 'Bot', text: `You selected: ${option}` }]); // Add bot response
    };

    return (
        <div className="flex flex-col h-screen w-screen bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500">
            {/* Header */}
            <header className="p-6 bg-indigo-700 text-white shadow-md">
                <h1 className="text-2xl font-bold text-center">AI Chatbot</h1>
            </header>

            {/* Message Display Area */}
            <div className="flex-grow p-6 overflow-y-auto bg-white rounded shadow-lg m-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500 italic text-center">
                        Your conversation will appear here.
                    </p>
                ) : (
                    <div>
                        {messages.map((msg, index) => (
                            <p
                                key={index}
                                className={`text-sm p-2 my-1 rounded-lg ${
                                    msg.sender === 'User'
                                        ? 'bg-blue-100 text-right'
                                        : 'bg-gray-100 text-left'
                                }`}
                            >
                                {msg.text}
                            </p>
                        ))}
                    </div>
                )}

                {/* Render QuickOptions at the start of the conversation */}
                {messages.length === 0 && <QuickOptions onOptionClick={handleOptionClick} />}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-300 shadow-inner">
                <div className="flex w-full max-w-2xl mx-auto"> {/* Center the input area */}
                    <textarea
                        ref={textareaRef}
                        value={userInput}
                        onChange={handleInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 resize-none overflow-y-auto"
                        rows={1} // Default height for the input field
                        style={{ maxHeight: '150px', minHeight: '40px' }} // Maximum and minimum height
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-2 px-6 py-2 h-12 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-md focus:outline-none"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;


