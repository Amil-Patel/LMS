import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NotificationSetting from "../../../pages/admin/setting/NotificationSetting";
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";
import { userRolesContext } from "../../../pages/admin/layout/RoleContext";
import NotAuthor from "../../../pages/admin/notfound/NotAuthor";
const NotificationSettingRoute = () => {
  const { userRole } = useContext(userRolesContext);
  return (

    <Routes>
      <Route
        path="/notification-setting"
        element={
          <AdminAuthGuard>
            {userRole === "superAdmin" ? (
              <NotificationSetting />
            ) : (
              <NotAuthor />
            )}
          </AdminAuthGuard>
        }
      />
    </Routes>
  );
};

export default NotificationSettingRoute;
