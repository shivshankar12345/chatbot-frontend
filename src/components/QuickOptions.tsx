import React from 'react';

interface Feature {
  text: string;
  emoji: string;
}

interface QuickOptionsProps {
  features: Feature[];
  isDarkMode: boolean;
  onOptionClick: (option: string) => void;
}

const QuickOptions: React.FC<QuickOptionsProps> = ({ features, isDarkMode, onOptionClick }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8 px-4"> {/* Responsive grid layout */}
      {features.map((feature, index) => (
        <div
          key={index}
          onClick={() => onOptionClick(feature.text)} // Use feature.text for the click handler
          className={`flex flex-col items-center p-6 rounded-xl border shadow-md transition-transform transform hover:scale-105 cursor-pointer ${
            isDarkMode
              ? 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
              : 'bg-white border-gray-300 shadow-gray-300 hover:bg-indigo-50'
          }`}
        >
          <div className="text-6xl">{feature.emoji}</div>
          <p className="mt-2 text-center text-lg font-bold tracking-wide">{feature.text}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickOptions;
