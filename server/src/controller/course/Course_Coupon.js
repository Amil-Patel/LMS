const { Course_Coupon, System_Setting } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const moment = require('moment-timezone');
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getCourseCouponData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await Course_Coupon.findAll();
        // for (let i = 0; i < data.length; i++) {
        //     const expiredDate = UnixNumberToDate(data[i].expired_date, 'America/Toronto');
        //     data[i].dataValues.expired_date = expiredDate;
        // }
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const validateCoupon = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const { couponCode } = req.body;
        const coupon = await Course_Coupon.findOne({
            where: { coupon_code: couponCode },
        });

        if (!coupon) {
            return res.status(404).json({ success: false, message: 'Invalid coupon code.' });
        }
        //getting timezone from system setting to convert expired date
        const setting = await System_Setting.findAll();
        const timeZone = setting[0].timezone;
        // Check if the coupon is expired
        const currentDate = new Date();
        const expiredDate = UnixNumberToDate(coupon.expired_date, timeZone);
        if (expiredDate && new Date(expiredDate) < currentDate) {
            return res.status(400).json({ success: false, message: 'This coupon has expired.' });
        }

        // Return the discount
        return res.json({
            success: true,
            discount: coupon.discount_in_percentage ? coupon.discount_in_percentage : coupon.discount_in_amount,
            is_percentage: coupon.discount_in_percentage ? true : false,
            is_amount: coupon.discount_in_amount ? true : false,
            courseIds: coupon.course_name,
            message: 'Coupon is valid and discount applied.'
        });
    } catch (error) {
        console.error('Error validating coupon:', error);
        return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
}

const getCourseCouponDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Coupon.findOne({
            where: {
                id: id
            }
        });
        // const expiredDate = UnixNumberToDate(data.expired_date, 'America/Toronto');
        // data.dataValues.expired_date = expiredDate;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addCourseCouponData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const expiredate = DateToUnixNumber(req.body.expired_date, 'America/Toronto');
    const createdate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        coupon_code: req.body.coupon_code,
        course_name: req.body.course_name,
        discount_in_percentage: req.body.discount_in_percentage || null,
        discount_in_amount: req.body.discount_in_amount || null,
        expired_date: expiredate,
        status: 1,
        created_by: req.body.created_by || 0,
        updated_by: req.body.updated_by || 0,
        createdAt: createdate,
        updatedAt: createdate,
    }
    try {
        const courseCoupondate = await Course_Coupon.create(data);
        res.status(200).json(courseCoupondate);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCourseCouponData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const expiredate = DateToUnixNumber(req.body.expired_date, 'America/Toronto');
    const updatedat = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        coupon_code: req.body.coupon_code,
        course_name: req.body.course_name,
        discount_in_percentage: req.body.discount_in_percentage || null,
        discount_in_amount: req.body.discount_in_amount || null,
        expired_date: expiredate,
        updated_by: req.body.updated_by || 0,
        updatedAt: updatedat,
    }
    try {
        const courseCoupondate = await Course_Coupon.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(courseCoupondate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateCourseCouponStatus = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const status = req.body.status;
    const newStatus = status === 1 ? 0 : 1;
    try {
        const data = await Course_Coupon.update({ status: newStatus }, {
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteCourseCouponData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await Course_Coupon.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getCourseCouponData,
    validateCoupon,
    getCourseCouponDataWithId,
    addCourseCouponData,
    updateCourseCouponData,
    updateCourseCouponStatus,
    deleteCourseCouponData
}