'use strict';
const DateToUnixNumber = require('../../middleware/DateToUnixNumber');
const moment = require('moment-timezone');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // const date = new Date();
    const time_zone = 'America/Toronto';
    const expire = moment.tz(new Date().toString()).unix();
    const unixTimestamp = 1724738094;
    const formattedDate = moment.unix(unixTimestamp).tz('America/Los/Angeles').format('YYYY-MM-DD');
    console.log(formattedDate)
    //   function strtotime(dateString) {
    //     const date = new Date(dateString);
    //     return Math.floor(date.getTime() / 1000);
    // }

    // // Example usage:
    // const unixTime = strtotime("2024-08-26 12:34:56");
    // console.log(unixTime);

    // const time_zone_date = DateToUnixNumber(date, time_zone);
    return queryInterface.bulkInsert('system_settings', [
      {
        timezone: 'America/Toronto (EST)',
        currency: "USD",
        position: 'left',
        email_verification: 1,
        max_authorized_device: 2,
        createdAt: expire,
        updatedAt: expire,
      },
      {
        timezone: 'Africa/Bangui (WAT)',
        currency: "USD",
        position: 'left',
        email_verification: 0,
        max_authorized_device: 1,
        createdAt: expire,
        updatedAt: expire,
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('system_settings', null, {});
  },
};
