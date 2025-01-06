const { payment, student_cart, UserMaster } = require("../../database/models/index");
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

const getPaymentData = async (req, res) => {
    try {
        // Fetch all payments
        const paymentData = await payment.findAll({ raw: true });

        const detailedPayments = await Promise.all(
            paymentData.map(async (payment) => {
                const courseIds = JSON.parse(payment.courses);
                // Fetch course names
                const courseNames = await student_cart.findAll({
                    where: { id: courseIds },
                    attributes: ['course_title','expiring_time', 'course_price', 'tax_rate', 'course_discount', 'is_inclusive', 'is_exclusive'],
                    raw: true,
                });

                // Fetch student name
                const studentData = await UserMaster.findOne({
                    where: { id: payment.student_id },
                    attributes: ['first_name', 'last_name', 'email'],
                    raw: true,
                });

                return {
                    ...payment,
                    courseNames: courseNames.map((c) => c),
                    studentName: studentData ? studentData : 'Unknown',
                };
            })
        );

        res.send(detailedPayments);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching payment data.' });
    }
};
module.exports = { addPaymentData, getPaymentData }