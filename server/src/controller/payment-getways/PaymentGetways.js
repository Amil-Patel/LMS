const { Payment_Getway } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getPaymentGetwayData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const data = await Payment_Getway.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updatePaymentGetwayData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const id = req.params.id;
    const data = {
        identifier: req.body.identifier,
        currency: req.body.currency,
        title: req.body.title,
        description: req.body.description || null,
        keys: JSON.stringify(req.body.keys),
        model_name: req.body.model_name,
        enabled_test_mode: req.body.enabled_test_mode,
        status: req.body.status,
        updatedAt: new Date(),
    }
    try {
        const userroledata = await Payment_Getway.update(data, {
            where: {
                id: id
            }
        })
        console.log("userroledata")
        console.log(userroledata)
        console.log("userroledata")
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addPaymentGetwayData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const data = {
        identifier: req.body.identifier,
        currency: req.body.currency,
        title: req.body.title,
        description: req.body.description,
        keys: JSON.stringify(req.body.keys),
        model_name: req.body.model_name,
        enabled_test_mode: req.body.enabled_test_mode,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const userroledata = await Payment_Getway.create(data);
        res.status(200).json(userroledata);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getPaymentGetwayData,
    addPaymentGetwayData,
    updatePaymentGetwayData
}