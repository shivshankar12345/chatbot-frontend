import React from "react";

interface Option {
  id: string;
  text: string;
}

interface QuickOptionsProps {
  features: Option[];
  isDarkMode: boolean;
  onOptionClick: (optionKey: string) => void;
}

const QuickOptions: React.FC<QuickOptionsProps> = ({
  features,
  isDarkMode,
  onOptionClick,
}) => {
  return (
    <div className={`flex flex-col space-y-2 p-4`}>
      {features.map((feature) => (
        <button
          key={feature.id}
          onClick={() => onOptionClick(feature.id)}
          className={`p-3 rounded-lg transition-all duration-300 hover:shadow-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-blue-400 text-white hover:bg-blue-500"
          }`}
        >
          {feature.text}
        </button>
      ))}
    </div>
  );
};

export default QuickOptions;
