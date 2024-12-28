const { Currency, System_Setting } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware");

const getCurrencyData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await Currency.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const getCurrencyDataWithid = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    try {
        const data = await System_Setting.findOne({ where: { id: id } });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCurrencyData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { currency, position } = req.body;
    const id = req.params.id
    try {
        await System_Setting.update({ currency: currency, position: position }, { where: { id: id } });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { getCurrencyData, getCurrencyDataWithid, updateCurrencyData }