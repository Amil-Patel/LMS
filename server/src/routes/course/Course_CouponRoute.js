const express=require("express");
const CourseCoupon = express.Router();
const CourseCouponController = require("../../controller/course/Course_Coupon");

CourseCoupon.get("/gettingCourseCouponData", CourseCouponController.getCourseCouponData);
CourseCoupon.get("/gettingCourseCouponDataWithId/:id", CourseCouponController.getCourseCouponDataWithId);
CourseCoupon.post("/addingCourseCoupon", CourseCouponController.addCourseCouponData);
CourseCoupon.put("/updatingCourseCoupon/:id", CourseCouponController.updateCourseCouponData);
CourseCoupon.put("/updatingCourseCouponStatus/:id", CourseCouponController.updateCourseCouponStatus);
CourseCoupon.delete("/deletingCourseCoupon/:id", CourseCouponController.deleteCourseCouponData);



module.exports = CourseCoupon




