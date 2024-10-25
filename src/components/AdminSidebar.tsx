import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  // FaCogs,
  FaChartBar,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const businessName = localStorage.getItem("businessName");

  return (
    <div className="h-[150%] w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
      {/* Logo Section */}
      <div className="p-6 text-center border-b border-gray-700">
        <h1 className="text-3xl font-bold tracking-wider">Chatbot Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-grow mt-10">
        <ul>
          {/* Business Link */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <NavLink
              to={
                businessName ? `/chatbot/admin/${businessName}/business` : "/"
              }
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold flex items-center"
                  : "text-white flex items-center"
              }
            >
              <FaTachometerAlt className="mr-3 text-xl" />
              Business
            </NavLink>
          </li>

          {/* Question-Answer Link */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <NavLink
              to={
                businessName
                  ? `/chatbot/admin/${businessName}/question-answers`
                  : "/"
              }
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold flex items-center"
                  : "text-white flex items-center"
              }
            >
              <FaQuestionCircle className="mr-3 text-xl" />
              Question-Answer
            </NavLink>
          </li>

          {/* Settings Link */}
          {/* <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <NavLink 
              to="/admin/settings" 
              className={({ isActive }) => (isActive ? "text-blue-400 font-semibold flex items-center" : "text-white flex items-center")}
            >
              <FaCogs className="mr-3 text-xl" />
              Settings
            </NavLink>
          </li> */}

          {/* Reports Link */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <NavLink
              to={businessName ? `/chatbot/admin/${businessName}/reports` : "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold flex items-center"
                  : "text-white flex items-center"
              }
            >
              <FaChartBar className="mr-3 text-xl" />
              Reports
            </NavLink>
          </li>

          {/* User Management Link */}
          <li className="p-4 hover:bg-gray-700 cursor-pointer transition duration-200 rounded-lg">
            <NavLink
              to={`/chatbot/user/${localStorage.getItem("businessName")}`}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold flex items-center"
                  : "text-white flex items-center"
              }
            >
              <FaSignOutAlt className="mr-3 text-xl" />
              Go Back to Home
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-700">
        <p className="text-center text-sm opacity-70">
          © 2024 Chatbot Application
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
