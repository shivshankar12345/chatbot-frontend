import React from "react";
import { Route, Routes } from "react-router-dom";
import { BusinessPage } from "../pages/BusinessPage";
import AdminLayout from "../layout/AdminLayout";
import QAPage from "../pages/QAPage";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route path="business" element={<BusinessPage />} />
        <Route path="question-answers" element={<QAPage/>} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;