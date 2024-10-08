import React from "react";
import { Routes, Route } from "react-router-dom";
import Profile from "../../../pages/admin/profile/Profile";
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";
const ProfileRoute = () => {
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <AdminAuthGuard>
            <Profile />
          </AdminAuthGuard>
        }
      />
    </Routes>
  );
};

export default ProfileRoute;
