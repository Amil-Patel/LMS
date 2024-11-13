import React from "react";
import ToastMessage from "./pages/admin/layout/ToastMessage";
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
import UserRoute from "./routes/admin/user/UserRoute";
import ProfileRoute from "./routes/admin/profile/ProfileRoute";
import { RoleContext } from "./pages/admin/layout/RoleContext";
import LoginRoute from "./routes/admin/LoginRoute";
import EditCourseRoute from "./routes/admin/course/EditCourseRoute";
import HomeRoute from "./routes/client/HomeRoute";
import CourseRoute from "./routes/client/CourseRoute";
import ShoppingCartRoute from "./routes/client/ShoppingCartRoute";

const App = () => {
  return (
    <>
      <ToastMessage />
      <RoleContext>
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
        <UserRoute />
        <NotificationSettingRoute />
        <PaymentSettingRoute />
        <ProfileRoute />
        <LoginRoute />
        <EditCourseRoute />
      </RoleContext>
      <HomeRoute />
      <CourseRoute/>
      <ShoppingCartRoute/>
    </>
  );
};

export default App;
