const moment = require('moment-timezone');

const UnixNumberToDate = (unix_number, time_zone) => {
    const date = moment.unix(unix_number).tz(time_zone).format('YYYY-MM-DD');
    return date
}

module.exports = UnixNumberToDate
