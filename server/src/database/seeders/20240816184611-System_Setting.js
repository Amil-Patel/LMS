'use strict';
const DateToUnixNumber = require('../../middleware/DateToUnixNumber');
const moment = require('moment-timezone');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // const date = new Date();
    const expire = moment.tz(new Date().toString()).unix();
    const unixTimestamp = 1724738094;
    const formattedDate = moment.unix(unixTimestamp).tz('America/Toronto').format('YYYY-MM-DD');
    return queryInterface.bulkInsert('system_settings', [
      {
        timezone: 'America/Toronto',
        currency: "US Dollar",
        Symbol: "$",
        position: 'left',
        email_verification: 1,
        max_authorized_device: 2,
        createdAt: expire,
        updatedAt: expire,
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('system_settings', null, {});
  },
};
