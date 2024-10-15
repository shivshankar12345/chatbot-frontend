import React from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Business Overview</h2>

      {/* Back Button */}
      <button
        onClick={() => navigate('/admin/business')} // Navigate back to Business List
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6 transition duration-200 hover:bg-blue-700"
      >
        Back to Business List
      </button>

      {/* Business Information Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Business Information</h3>
        <div className="flex flex-col space-y-4">
          <div>
            <strong>Name:</strong> Chatbot Co.
          </div>
          <div>
            <strong>Email:</strong> contact@chatbotco.com
          </div>
          <div>
            <strong>Phone:</strong> +1 (234) 567-8900
          </div>
          <div>
            <strong>Website:</strong> www.chatbotco.com
          </div>
        </div>
      </div>

      {/* Performance Metrics Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-2xl font-semibold mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-4 rounded-lg text-center">
            <h4 className="font-bold text-xl">Total Interactions</h4>
            <p className="text-2xl">1,234</p>
          </div>
          <div className="bg-green-100 p-4 rounded-lg text-center">
            <h4 className="font-bold text-xl">Conversion Rate</h4>
            <p className="text-2xl">85%</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg text-center">
            <h4 className="font-bold text-xl">User Feedback</h4>
            <p className="text-2xl">4.7/5</p>
          </div>
        </div>
      </div>

      {/* Business Settings Section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">Manage Settings</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-700">
          Edit Business Information
        </button>
      </div>
    </div>
  );
};

export default BusinessPage;
