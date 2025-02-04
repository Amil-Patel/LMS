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

    try {
        let cartData = req.body.cart;
        console.log(cartData)
        // Normalize cartData: If it's a single object, wrap it in an array
        if (!Array.isArray(cartData)) {
            cartData = [cartData];
        }
        // Prepare the data for bulk insertion
        const dataArray = cartData
            .filter((item) => item.id && item.course_title && item.studentId) // Ensure required fields are present
            .map((item) => ({
                course_id: item.id,
                student_id: item.studentId,
                course_title: item.course_title,
                auther: item.auther,
                course_thumbnail: item.course_thumbnail,
                expiring_time: item.expiring_time || null,
                no_of_month: item.no_of_month || 0,
                course_price: item.course_price || 0,
                tax_rate: item.tax_rate || 0,
                is_inclusive: item.is_inclusive || 0,
                is_exclusive: item.is_exclusive || 0,
                course_discount: item.course_discount || 0,
            }));

        //now i want to check that above data is already avalible in database if avalibe i do not want to add it again
        const existingData = await student_cart.findAll({
            where: {
                course_id: {
                    [Op.in]: dataArray.map((item) => item.course_id),
                },
                student_id: {
                    [Op.in]: dataArray.map((item) => item.student_id),
                },
            },
        })

        const existingCourseIds = existingData.map((item) => item.course_id);
        const existingStudentIds = existingData.map((item) => item.student_id);

        dataArray.forEach((item) => {
            if (existingCourseIds.includes(item.course_id) && existingStudentIds.includes(item.student_id)) {
                dataArray.splice(dataArray.indexOf(item), 1);
            }
        })

        if (dataArray.length == 0) {
            return res.status(400).json({ message: "No valid data to insert" });
        }

        const result = await student_cart.bulkCreate(dataArray);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
};




const removeStudentCartData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
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