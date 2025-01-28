const moment = require('moment-timezone');

const DateToUnixNumber = (date, time_zone) => {
    const unix_number = moment.tz(date, time_zone).unix();
    return unix_number
}

module.exports = DateToUnixNumber

