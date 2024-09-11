import React from "react";
import { Route, Routes } from "react-router-dom";
import NotificationSetting from "../../../pages/admin/setting/NotificationSetting";

const NotificationSettingRoute = () => {
  return (

    <Routes>
      <Route
        path="/notification-setting"
        element={<NotificationSetting/>}
      />
       </Routes>
  );
};

export default NotificationSettingRoute;
