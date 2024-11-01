import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationSetting from "../../../pages/admin/setting/NotificationSetting";
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";
const NotificationSettingRoute = () => {
  return (

    <Routes>
      <Route
        path="/admin/notification-setting"
        element={
          <AdminAuthGuard>
              <NotificationSetting />
          </AdminAuthGuard>
        }
      />
    </Routes>
  );
};

export default NotificationSettingRoute;
