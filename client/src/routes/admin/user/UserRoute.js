import React from "react";
import { Routes, Route } from "react-router-dom";
import User from "../../../pages/admin/user/User";
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";

const UserRoute = () => {
  return (
    <Routes>
      <Route
        path="/user"
        element={
          <>
            <AdminAuthGuard>
              <User />
            </AdminAuthGuard>
          </>
        }
      />
    </Routes>
  );
};

export default UserRoute;
