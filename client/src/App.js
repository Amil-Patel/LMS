import React from "react";
import "./assets/css/main.css";
import DashboardRoute from "./routes/admin/DashboardRoute";
import CourseCouponRoute from "./routes/admin/course/CourseCouponRoute";
import CourseCategoryRoute from "./routes/admin/course/CourseCategoryRoute";
import AddCourseRoute from "./routes/admin/course/AddCourseRoute";
import AllCourseRoute from "./routes/admin/course/AllCourseRoute";
import NotificationSettingRoute from "./routes/admin/setting/NotificationSettingRoute";
import PaymentSettingRoute from "./routes/admin/setting/PaymentSettingRoute";
import EnrollementsRoute from "./routes/admin/enrollement/EnrollementsRoute";
import InquiryRoute from "./routes/admin/inquiry/InquiryRoute";
import PaymentRoute from "./routes/admin/payment/PaymentRoute";
import RoleslistRoute from "./routes/admin/roles-list/RoleslistRoute";
import ManageCourseRoute from "./routes/admin/course/ManageCourseRoute";

const App = () => {
  return (
    <>
      <DashboardRoute />
      <CourseCouponRoute />
      <CourseCategoryRoute />
      <AddCourseRoute />
      <AllCourseRoute />
      <ManageCourseRoute />
      <EnrollementsRoute />
      <InquiryRoute />
      <PaymentRoute />
      <RoleslistRoute />
      <NotificationSettingRoute />
      <PaymentSettingRoute />
    </>
  );
};

export default App;
