import React from "react";
import { Route, Routes } from "react-router-dom";
import CourseCoupon from "../../../pages/admin/course/CourseCoupon";

const CourseCouponRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/course-coupon"
          element={
            <>
              <CourseCoupon />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default CourseCouponRoute;
