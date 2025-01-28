import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminAuthGuard from "../../pages/admin/layout/auth/AdminAuthGuard";
import Dashboard from "../../pages/admin/dashboard/Dashboard";

const DashboardRoute = () => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <>
            <AdminAuthGuard>
              <Dashboard />
            </AdminAuthGuard>
          </>
        }
      />
    </Routes>
  );
};

export default DashboardRoute;
