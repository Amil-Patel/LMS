const { Payment_Getway } = require("../../database/models/index");


const getPaymentGetwayData = async (req, res) => {
    try {
        const data = await Payment_Getway.findAll();
        console.log(data)
        res.send(data[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const updatePaymentGetwayData = async (req, res) => {
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
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    getPaymentGetwayData,
    updatePaymentGetwayData
}