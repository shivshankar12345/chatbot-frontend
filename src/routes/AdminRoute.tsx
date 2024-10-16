import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import BusinessList from "../pages/BusinessList";
import BusinessPage from "../pages/BusinessPage";
import QAPage from "../pages/QAPage";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<AdminLayout />}>
        <Route path="business" element={<BusinessList />} />
        <Route path="business/overview/:id" element={<BusinessPage/>} />
        <Route path="question-answers" element={<QAPage/>}/>
        <Route path ="settings" element ={<Settings/>}/>
        <Route path="reports" element={<Reports/>}/>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;