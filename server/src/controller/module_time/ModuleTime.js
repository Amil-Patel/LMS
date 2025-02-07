const { module_spent_time } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");
const DateToUnixNumber = require("../../middleware/DateToUnixNumber");

const gettingModuleTimeData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;

    // Get request body
    const { student_id, course_id, module_id } = req.body;
    console.log(student_id, course_id, module_id);
    try {
        const moduleTimeData = await module_spent_time.findAll({
            where: { student_id, course_id, module_id }
        });
        console.log(moduleTimeData)
        return res.status(200).json({ success: true, data: moduleTimeData });
    } catch (error) {
        console.error(error);
    }
}
const updateModuleTime = async (req, res) => {
    try {
        // Check authentication
        const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
        if (!isAuthenticated) return;

        // Get request body
        const { student_id, course_id, module_id } = req.body;

        if (!student_id || !course_id || !module_id) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Get the current timestamp
        const updatedDate = DateToUnixNumber(new Date(), "America/Toronto");

        // Find existing module time record
        let moduleTimeRecord = await module_spent_time.findOne({
            where: { student_id, course_id, module_id }
        });

        if (!moduleTimeRecord) {
            // Create new record if not found
            moduleTimeRecord = await module_spent_time.create({
                student_id,
                course_id,
                module_id,
                spent_time: 0,
                createdAt: updatedDate,
                updatedAt: updatedDate
            });
        }

        // Update spent time by adding 10
        const newTime = moduleTimeRecord.spent_time + 10;

        const [updatedRows] = await module_spent_time.update(
            { spent_time: newTime, updatedAt: updatedDate },
            { where: { student_id, course_id, module_id } }
        );

        if (updatedRows === 0) {
            return res.status(500).json({ success: false, message: "Failed to update module time" });
        }

        return res.json({ success: true, spent_time: newTime });
    } catch (error) {
        console.error("Error updating module time:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

module.exports = { updateModuleTime, gettingModuleTimeData };