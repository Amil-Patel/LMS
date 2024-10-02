const { timezone } = require('../../database/models/index');
const AuthMiddleware = require("../../auth/AuthMiddleware");

const getTimezoneData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await timezone.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { getTimezoneData };
