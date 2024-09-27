import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminAuthGuard from "../../pages/admin/layout/auth/AdminAuthGuard";
import CourseCategory from "../../pages/admin/course/CourseCategory";

const DashboardRoute = () => {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <>
            <AdminAuthGuard>
              <CourseCategory />
            </AdminAuthGuard>
          </>
        }
      />
    </Routes>
  );
};

export default DashboardRoute;
