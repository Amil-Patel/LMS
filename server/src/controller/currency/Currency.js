const { Currency } = require("../../database/models/index");
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


module.exports = { getCurrencyData }