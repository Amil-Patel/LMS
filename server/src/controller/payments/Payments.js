const { payment, order, UserMaster, enrollment, order_detail } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");
const stipe_secret_key = require('../../key')
const stripe = require("stripe")(stipe_secret_key);

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

const addProcessedPaymentData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const createdate = DateToUnixNumber(new Date(), 'America/Toronto');
    const expiredate = DateToUnixNumber(new Date(), 'America/Toronto');
    const { user_id, courses, billing_info } = req.body;
    let orders;
    let paymentData;
    let session;
    const total_amount = parseInt(req.body.total_amount)
    try {
        // Calculate total amount with discount and tax adjustments
        let totalAmount = 0;

        courses.forEach((course) => {
            totalAmount += parseFloat(course.course_taxamount);
        });
        session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: courses.map((course) => {
                const discountAmount = parseFloat(course.discount_amount) || 0;
                const taxAmount = parseFloat(course.course_taxamount) || 0;

                // Calculate the final amount in smallest currency unit (e.g., cents for INR)
                const finalAmount = discountAmount + taxAmount;

                if (isNaN(finalAmount)) {
                    throw new Error(`Invalid amount for course: ${JSON.stringify(course)}`);
                }

                console.log(billing_info.currency)
                return {
                    price_data: {
                        currency: billing_info.currency.toLowerCase(),
                        product_data: {
                            name: course.title,
                        },
                        unit_amount: Math.round(finalAmount * 100),
                    },
                    quantity: 1,
                };
            }),
            mode: "payment",
            success_url: `${process.env.REACT_APP_SUCCESS_URL}`,
            cancel_url: `${process.env.REACT_APP_CANCEL_URL}`,
            customer_email: billing_info.email,
        });


        // Add data into enrollment
        for (const course of courses) {
            await enrollment.create({
                student_id: user_id,
                course_id: course.id,
                enrollment_mode: "online",
                status: 1,
                createdAt: createdate,
                updatedAt: expiredate,
            });
        }

        // Add order data
        orders = await order.create({
            user_id: user_id,
            quantity: courses.length,
            status: "pending",
            createdAt: createdate,
            updatedAt: createdate,
        });

        // Add order details in order_detail table
        for (const course of courses) {
            await order_detail.create({
                order_id: orders.id,
                course_id: course.id,
                course_title: course.title,
                quantity: 1,
                course_amount: course.amount,
                course_tax: course.tax,
                course_taxamount: course.taxAmount,
                discount: course.discount,
                is_inclusive: course.is_inclusive,
                is_exclusive: course.is_exclusive,
                createdAt: createdate,
                updatedAt: createdate
            });
        }

        // Add payment data
        paymentData = await payment.create({
            student_id: user_id,
            order_id: orders.id,
            amount: parseFloat(totalAmount).toFixed(2), // Use the calculated total amount
            payment_mode: "online",
            transaction_id: "", // Placeholder for now
            bill_mobile: billing_info?.phone,
            bill_name: billing_info?.name,
            bill_address: billing_info?.address,
            bill_gst: billing_info?.gst,
            bill_pan: billing_info?.pan,
            status: "success",
            createdAt: createdate,
            updatedAt: createdate
        });

        const transactionId = session.id;
        const updatedPayment = await payment.update(
            { transaction_id: transactionId },
            { where: { id: paymentData.dataValues?.id } }
        );

        if (updatedPayment[0] > 0) {
            console.log('Transaction ID successfully updated.');
        } else {
            console.error('Failed to update Transaction ID.');
        }

        res.json({ id: session.id });

    } catch (error) {
        console.error("Error processing courses and payment:", error);
        res.status(500).send("Failed to process courses and payment.");
    }
};



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
                    attributes: ['course_title', 'quantity', 'course_amount', "course_tax", "course_amount", "discount", "is_inclusive", "is_exclusive"],
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
module.exports = { addPaymentData, getPaymentData, getPaymentDataForStudent, addProcessedPaymentData }
