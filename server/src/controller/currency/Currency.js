const { Currency } = require("../../database/models/index");

const getCurrencyData = async (req, res) => {
    try {
        const data = await Currency.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = { getCurrencyData }