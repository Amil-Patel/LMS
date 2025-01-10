const express = require("express");

const router = express.Router();
const UserRoleRoute = require("./user/UserRoleRoute");
const UserMasterRoute = require("./user/UserMasterRoute");
const CourseCateRoute = require("./course/Course_CategoryRoute");
const CourseMasterRoute = require("./course/Course_MasterRoute");
const CourseCoupon = require("./course/Course_CouponRoute");
const systemSetting = require("./system-setting/System_SettingRoute");
const Payment_Getway = require("./payment-getway/PaymentGetwaysRoute");
const Smtp_Setting = require("./email-setting/Smtp_SettingRoute");
const EmailNotificationRoute = require("./email-setting/Email_Notification_SettingRoute");
const CourseSectionRoute = require("./course/Course_SectionRoute");
const CourseLesson = require("./course/Course_LessonRoute");
const CourseQuizeRoute = require("./course/Course_QuizeRoute");
const COurseQuizeQuestionRoute = require("./course/Course_Quize_QuestionRoute");
const CurrencyRoute = require("./currency/CurrencyRoute");
const TimezoneRoute = require("./timezone/TimezoneRoute");
const EnrollmentRoute = require("./enrollments/EnrollmentRoute");
const AcademicProgressRoute = require("./academic_progress/Academic_ProgressRoute");
const RolePermissionRoute = require("./role/RolePermissionRoute");
const CheckRolePermissionRoute = require("./check_role_permission/CheckRolePermissionRoute");
const LoginRoute = require('./login/LoginRoute');
const CourseResourceRoute = require('./course/Course_ResourceRoute');
const PaymentsRoute = require('./payments/PaymentsRoute');
const QuizResultRoute = require('./course/Quiz_ResultRoute');
const InquiryRoute = require('./inquiry/InquiryRoute');
const Student_Cart = require('./student_cart/Student_CartRoute');
const OrderRoute = require('./order/OrderRoute');

router.use("/", UserRoleRoute);
router.use("/", UserMasterRoute);
router.use("/", CourseCateRoute);
router.use("/", CourseMasterRoute);
router.use("/", CourseCoupon);
router.use("/", systemSetting);
router.use("/", Payment_Getway);
router.use("/", Smtp_Setting);
router.use("/", EmailNotificationRoute);
router.use("/", CourseSectionRoute);
router.use("/", CourseLesson);
router.use("/", CourseQuizeRoute);
router.use("/", COurseQuizeQuestionRoute);
router.use("/", CurrencyRoute);
router.use("/", TimezoneRoute);
router.use("/", EnrollmentRoute);
router.use("/", AcademicProgressRoute);
router.use("/", RolePermissionRoute);
router.use("/", CheckRolePermissionRoute);
router.use('/', LoginRoute)
router.use('/', CourseResourceRoute)
router.use('/', PaymentsRoute)
router.use('/', QuizResultRoute)
router.use('/', InquiryRoute)
router.use('/', Student_Cart)
router.use('/', OrderRoute)



module.exports = router