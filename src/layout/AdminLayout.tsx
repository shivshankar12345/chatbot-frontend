// AdminPage.tsx
import React from 'react';
//import Sidebar from '../components/Sidebar'; // Import Sidebar component
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />
      <div className="flex-1 p-4  bg-gray-100 min-h-screen transition-all duration-300">
        <Outlet /> {/* This renders the matched child route component */}
      </div>

    </div>
  );
};

export default AdminLayout;