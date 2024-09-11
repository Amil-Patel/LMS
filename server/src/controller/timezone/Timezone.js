const { timezone } = require('../../database/models/index');


const getTimezoneData = async (req, res) => {
    try {
        const data = await timezone.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = { getTimezoneData };
