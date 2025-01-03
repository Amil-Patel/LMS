const { student_cart } = require('../../database/models/index');
const AuthMiddleware = require('../../auth/AuthMiddleware');
const { Op, where } = require('sequelize');

const getStudentCartData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;

    try {
        const data = await student_cart.findAll({
            where: {
                student_id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const addStudentCartData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const data = {
        course_id: req.body.cart.id,
        student_id: req.body.cart.studentId,
        course_title: req.body.cart.course_title,
        expiring_time: req.body.cart.expiring_time,
        no_of_month: req.body.cart.no_of_month,
        course_price: req.body.cart.course_price,
        tax_rate: req.body.cart.tax_rate,
        is_inclusive: req.body.cart.is_inclusive,
        is_exclusive: req.body.cart.is_exclusive,
        course_discount: req.body.cart.course_discount
    };
    try {
        const result = await student_cart.create(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
}

const removeStudentCartData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    console.log("Authenticated:", isAuthenticated);
    if (!isAuthenticated) return;
    const courseId = parseInt(req.query.course_id);
    const id = parseInt(req.query.id);
    const studentId = parseInt(req.query.student_id);

    try {
        const result = await student_cart.destroy({
            where: {
              id: id,
              course_id: courseId,
              student_id: studentId
            }
        });
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ success: false, error });
    }
};


module.exports = { getStudentCartData, addStudentCartData, removeStudentCartData }