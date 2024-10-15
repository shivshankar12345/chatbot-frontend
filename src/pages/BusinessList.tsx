import React from 'react';
import { NavLink } from 'react-router-dom';

const businesses = [
  { id: 1, name: 'Chatbot Co.', email: 'contact@chatbotco.com' },
  { id: 2, name: 'AI Solutions', email: 'info@aisolutions.com' },
  { id: 3, name: 'Tech Innovations', email: 'support@techinnovations.com' },
];

const BusinessList: React.FC = () => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Business List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <li key={business.id} className="bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
            <NavLink
              to={`/admin/business/overview/${business.id}`} // Updated link to use the business ID
              className="block p-6 text-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              <h3 className="mb-2">{business.name}</h3>
              <p className="text-gray-600">{business.email}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;

