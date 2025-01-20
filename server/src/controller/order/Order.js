const { order, order_detail } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addOrderData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
        const orderData = {
            user_id: req.body.user_id,
            quantity: req.body.quantity,
            status: req.body.status,
            createdAt: createdDate,
            updatedAt: createdDate
        }
        const newOrder = await order.create(orderData);
        return res.status(200).json({
            status: 200,
            data: newOrder,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

const addingOrderDetailItems = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const createdDate = DateToUnixNumber(new Date(), "America/Toronto");
        const orderDetailData = {
            order_id: req.body.order_id,
            course_id: req.body.course_id,
            course_title: req.body.course_title,
            quantity: req.body.quantity,
            course_amount: req.body.course_amount,
            course_tax: req.body.course_tax,
            course_taxamount: req.body.course_taxamount,
            discount: req.body.discount,
            is_inclusive: req.body.is_inclusive,
            is_exclusive: req.body.is_exclusive,
            createdAt: createdDate,
            updatedAt: createdDate
        }
        const newOrderDetail = await order_detail.create(orderDetailData);
        return res.status(200).json({
            status: 200,
            data: newOrderDetail,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { addOrderData, addingOrderDetailItems }