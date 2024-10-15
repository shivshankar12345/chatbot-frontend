import React from "react";
import { Route, Routes } from "react-router-dom";
import  BusinessPage  from "../pages/BusinessPage";
import AdminLayout from "../layout/AdminLayout";
import BusinessList from "../pages/BusinessList";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route path="business" element={<BusinessList />} />
        <Route path="business/overview/:id" element={<BusinessPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;