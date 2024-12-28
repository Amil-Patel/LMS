import React, { useEffect } from "react";
import ToastMessage from "./pages/admin/layout/ToastMessage";
import { useLocation } from "react-router-dom";
import DashboardRoute from "./routes/admin/DashboardRoute";
import CourseCouponRoute from "./routes/admin/course/CourseCouponRoute";
import CourseCategoryRoute from "./routes/admin/course/CourseCategoryRoute";
import AddCourseRoute from "./routes/admin/course/AddCourseRoute";
import AllCourseRoute from "./routes/admin/course/AllCourseRoute";
import NotificationSettingRoute from "./routes/admin/setting/NotificationSettingRoute";
import PaymentSettingRoute from "./routes/admin/setting/PaymentSettingRoute";
import GeneralSettingRoute from "./routes/admin/setting/GeneralSettingRoute";
import EnrollementsRoute from "./routes/admin/enrollement/EnrollementsRoute";
import InquiryRoute from "./routes/admin/inquiry/InquiryRoute";
import PaymentRoute from "./routes/admin/payment/PaymentRoute";
import RoleslistRoute from "./routes/admin/roles-list/RoleslistRoute";
import ManageCourseRoute from "./routes/admin/course/ManageCourseRoute";
import UserRoute from "./routes/admin/user/UserRoute";
import ProfileRoute from "./routes/admin/profile/ProfileRoute";
import { RoleContext } from "./pages/admin/layout/RoleContext";
import { CartProvider } from "./pages/client/layout/CartContext";
import LoginRoute from "./routes/admin/LoginRoute";
import EditCourseRoute from "./routes/admin/course/EditCourseRoute";
import HomeRoute from "./routes/client/HomeRoute";
import CourseRoute from "./routes/client/CourseRoute";
import ShoppingCartRoute from "./routes/client/ShoppingCartRoute";
import LearningRoute from "./routes/stu_dashboard/LearningRoute";
import ContactRoute from "./routes/client/ContactRoute";
const App = () => {
  const location = useLocation();

  // Smooth scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]); // Runs whenever the path changes
  return (
    <>
      <ToastMessage />
      <CartProvider>
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
          <GeneralSettingRoute />
          <ProfileRoute />
          <LoginRoute />
          <EditCourseRoute />
          <HomeRoute />
          <CourseRoute />
          <ShoppingCartRoute />
          <LearningRoute />
          <ContactRoute />
        </RoleContext >
      </CartProvider>
    </>
  );
};

export default App;
