// QuickOptions.tsx
import React from 'react';

interface Feature {
  text: string;
  emoji: string;
}

interface QuickOptionsProps {
  features: Feature[];
  isDarkMode: boolean;
}

const QuickOptions: React.FC<QuickOptionsProps> = ({ features, isDarkMode }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mt-8 px-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`flex flex-col items-center p-6 rounded-xl border shadow-md transition transform hover:scale-105 ${
            isDarkMode
              ? 'bg-gray-800 text-white border-gray-600'
              : 'bg-white border-gray-300 shadow-gray-300'
          }`}
        >
          <div className="text-6xl">{feature.emoji}</div>
          <p className="mt-2 text-center text-lg font-bold tracking-wide">
            {feature.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default QuickOptions;
