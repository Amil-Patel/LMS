const { Course_Coupon } = require("../../database/models/index");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const UnixNumberToDate = require("../../middleware/UnixNumberToDate");
const moment = require('moment-timezone');

const getCourseCouponData = async (req, res) => {
    try {
        const data = await Course_Coupon.findAll();
        for (let i = 0; i < data.length; i++) {
            const expiredDate = UnixNumberToDate(data[i].expired_date, 'America/Toronto');
            data[i].dataValues.expired_date = expiredDate;
        }
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getCourseCouponDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Course_Coupon.findOne({
            where: {
                id: id
            }
        });
        const expiredDate = UnixNumberToDate(data.expired_date, 'America/Toronto');
        data.dataValues.expired_date = expiredDate;
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addCourseCouponData = async (req, res) => {
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
    console.log(data)
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
    getCourseCouponDataWithId,
    addCourseCouponData,
    updateCourseCouponData,
    updateCourseCouponStatus,
    deleteCourseCouponData
}