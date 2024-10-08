import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseCoupon from "../../../pages/admin/course/CourseCoupon";
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotAuthor from '../../../pages/admin/notfound/NotAuthor'
import AdminAuthGuard from "../../../pages/admin/layout/auth/AdminAuthGuard";
const CourseCouponRoute = () => {
  const courseCouponPer = useCheckRolePermission("Course Coupon");
  const viewCoupon = courseCouponPer.length > 0 && courseCouponPer[0].can_view === 1 ? 1 : 0;
  return (
    <>
      <Routes>
        <Route
          path="/course-coupon"
          element={
            <AdminAuthGuard>
              {viewCoupon ? <CourseCoupon /> : <NotAuthor />}
            </AdminAuthGuard>
          }
        />
      </Routes>
    </>
  );
};

export default CourseCouponRoute;
