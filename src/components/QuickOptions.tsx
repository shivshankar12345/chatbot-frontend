import React from 'react';

interface QuickOptionsProps {
    onOptionClick: (option: string) => void;
}

const QuickOptions: React.FC<QuickOptionsProps> = ({ onOptionClick }) => {
    const options = [
        {
            title: 'Cart Information',
            description: 'Get details about the items currently in your cart.',
        },
        {
            title: 'Order Status',
            description: 'Track the status of your existing orders.',
        },
        {
            title: 'Offers',
            description: 'Discover the latest offers and discounts available.',
        },
    ];

    return (
        <div className="flex flex-col items-center bg-gray-100 p-4 rounded shadow-md mb-4 w-full">
            <p className="text-gray-700 mb-4 text-lg font-semibold">What do you want to know?</p>

            {/* Horizontal row layout with scroll */}
            <div className="flex gap-4 w-full max-w-4xl overflow-x-auto">
                {options.map((option, index) => (
                    <div
                        key={index}
                        onClick={() => onOptionClick(option.title)}
                        className="cursor-pointer min-w-[250px] p-4 bg-white shadow-lg rounded-lg hover:bg-indigo-50 transition duration-200 ease-in-out"
                    >
                        <h3 className="text-xl font-bold text-indigo-700">{option.title}</h3>
                        <p className="text-gray-600 mt-2">{option.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickOptions;
