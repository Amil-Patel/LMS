import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseCoupon from "../../../pages/admin/course/CourseCoupon";
import useCheckRolePermission from '../../../pages/admin/layout/CheckRolePermission';
import NotFound from '../../../pages/admin/notfound/NotFound'

const CourseCouponRoute = () => {
  const courseCouponPer = useCheckRolePermission("Course Coupon");
  const viewCoupon = courseCouponPer.length > 0 && courseCouponPer[0].can_view === 1 ? 1 : 0;
  return (
    <>
      <Routes>
        <Route
          path="/course-coupon"
          element={
            <>
              {viewCoupon ? <CourseCoupon /> : <NotFound />}
            </>
          }
        />
      </Routes>
    </>
  );
};

export default CourseCouponRoute;
