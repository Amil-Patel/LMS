const { payment } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const addPaymentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdate = DateToUnixNumber(new Date(), 'America/Toronto');
    const updatedate = DateToUnixNumber(new Date(), 'America/Toronto');
    const data = {
        student_id: req.body.student_id,
        courses: JSON.stringify(req.body.course_id),
        amount: req.body.amount,
        payment_mode: req.body.payment_mode,
        transaction_id: req.body.transaction_id,
        bill_mobile: req.body.bill_mobile,
        bill_name: req.body.bill_name,
        bill_address: req.body.bill_address,
        bill_gst: req.body.bill_gst,
        bill_pan: req.body.bill_pan,
        createdAt: createdate,
        updatedAt: updatedate
    }
    console.log(data);
    try {
        const paymentData = await payment.create(data);
        res.send(paymentData);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { addPaymentData }