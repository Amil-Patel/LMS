const { payment, order, UserMaster, order_detail } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addPaymentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdate = DateToUnixNumber(new Date(), 'America/Toronto');
    const updatedate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        student_id: req.body.student_id,
        order_id: req.body.order_id,
        amount: req.body.amount,
        payment_mode: req.body.payment_mode,
        transaction_id: req.body.transaction_id,
        bill_mobile: req.body.bill_mobile,
        bill_name: req.body.bill_name,
        bill_address: req.body.bill_address,
        bill_gst: req.body.bill_gst,
        bill_pan: req.body.bill_pan,
        status: req.body.status,
        createdAt: createdate,
        updatedAt: updatedate
    }
    try {
        const paymentData = await payment.create(data);
        res.send(paymentData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getPaymentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        // Fetch all payments
        const paymentData = await payment.findAll({ raw: true });

        const detailedPayments = await Promise.all(
            paymentData.map(async (payment) => {
                const order_id = payment.order_id;
                const orderData = await order.findOne({
                    where: { id: order_id },
                    attributes: ['user_id', 'quantity', 'status'],
                    raw: true,
                });
                // Fetch student name
                const orderDetailData = await order_detail.findAll({
                    where: { order_id: order_id },
                    attributes: ['course_title', 'quantity', 'course_amount', "course_tax", "course_amount", "discount"],
                    raw: true,
                });
                const studentData = await UserMaster.findOne({
                    where: { id: orderData.user_id },
                    attributes: ['first_name', 'last_name', 'email'],
                    raw: true,
                });
                return {
                    ...payment,
                    orderData: orderData || {}, // Ensure it handles null/undefined
                    orderDetails: orderDetailData || [], // Ensure it handles null/undefined
                    studentName: studentData || {},
                };
            })
        );

        res.send(detailedPayments);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching payment data.' });
    }
};

const getPaymentDataForStudent = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const student_id = req.params.student_id;
    try {
        // Fetch all payments
        const paymentData = await payment.findAll({
            where: { student_id: student_id },
            raw: true,
        });

        const detailedPayments = await Promise.all(
            paymentData.map(async (payment) => {
                const order_id = payment.order_id;
                const orderData = await order.findOne({
                    where: { id: order_id },
                    attributes: ['user_id', 'quantity', 'status'],
                    raw: true,
                });
                // Fetch student name
                const orderDetailData = await order_detail.findAll({
                    where: { order_id: order_id },
                    attributes: ['course_title', 'quantity', 'course_amount', "course_tax", "course_amount", "discount"],
                    raw: true,
                });
                const studentData = await UserMaster.findOne({
                    where: { id: orderData.user_id },
                    attributes: ['first_name', 'last_name', 'email'],
                    raw: true,
                });
                return {
                    ...payment,
                    orderData: orderData || {}, // Ensure it handles null/undefined
                    orderDetails: orderDetailData || [], // Ensure it handles null/undefined
                    studentName: studentData || {},
                };
            })
        );

        res.send(detailedPayments);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching payment data.' });
    }
};
module.exports = { addPaymentData, getPaymentData, getPaymentDataForStudent }