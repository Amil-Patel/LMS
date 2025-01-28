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
    try {
        const data = await System_Setting.findAll();
        res.send(data[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updateCurrencyData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { currency, symbol, position } = req.body;
    const id = req.params.id
    try {
        await System_Setting.update({ currency: currency, symbol: symbol, position: position }, { where: { id: id } });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { getCurrencyData, getCurrencyDataWithid, updateCurrencyData }