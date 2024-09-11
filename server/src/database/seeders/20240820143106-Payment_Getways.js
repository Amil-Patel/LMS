'use strict';
const DateToUnixNumber = require('../../middleware/DateToUnixNumber')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const date = '2023-10-05';
    const time_zone = 'America/Toronto';
    const time_zone_date = DateToUnixNumber(date, time_zone);
    return queryInterface.bulkInsert('payment_getways', [
      {
        identifier: 'stripe',
        currency: "USD",
        title: 'Stripe',
        description: null,
        keys: JSON.stringify({
          public_key: "as437&2OS",
          secret_key: "as437&2OS",
          public_live_key: "as437&2OS",
          secret_live_key: "as437&2OS",
        }),
        model_name: 'Payment Model',
        enabled_test_mode: 1,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('payment_getways', null, {});
  },
};
