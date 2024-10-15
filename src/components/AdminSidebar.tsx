import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaChartBar, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa';

const AdminSidebar: React.FC = () => {
  return (
    <div className="h-[120%] w-64 bg-gray-900 text-white flex flex-col shadow-lg transition-all duration-300">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wider">Chatbot Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex-grow">
        <ul>
          {/* Business Link */}
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <FaTachometerAlt className="mr-3 text-xl" />
            <NavLink to="/admin/business" className={({ isActive }) => (isActive ? "text-blue-400 font-semibold" : "text-white")}>
              Business
            </NavLink>
          </li>
         
          {/* Question-Answer Link */}
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <FaQuestionCircle className="mr-3 text-xl" />
            <NavLink to="/admin/question-answers" className={({ isActive }) => (isActive ? "text-blue-400 font-semibold" : "text-white")}>
              Question-Answer
            </NavLink>
          </li>
          
          {/* Settings Link */}
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <FaCogs className="mr-3 text-xl" />
            <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "text-blue-400 font-semibold" : "text-white")}>
              Settings
            </NavLink>
          </li>

          {/* Reports Link */}
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <FaChartBar className="mr-3 text-xl" />
            <NavLink to="/admin/reports" className={({ isActive }) => (isActive ? "text-blue-400 font-semibold" : "text-white")}>
              Reports
            </NavLink>
          </li>

          {/* User Management Link */}
          <li className="flex items-center p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <FaSignOutAlt className="mr-3 text-xl" />
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-400 font-semibold" : "text-white")}>
              Go Back to Home
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-center text-sm opacity-70">© 2024 Chatbot Application</p>
      </div>
    </div>
  );
};

export default AdminSidebar;
