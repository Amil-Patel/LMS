const { timezone, System_Setting } = require('../../database/models/index');
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
const getTimezoneDataWithId = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await System_Setting.findAll();
        res.send(data[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const updateTimezoneData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { timezonename } = req.body;
    try {
        await System_Setting.update({ timezone: timezonename }, { where: { id: 1 } });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = { getTimezoneData, getTimezoneDataWithId, updateTimezoneData };
