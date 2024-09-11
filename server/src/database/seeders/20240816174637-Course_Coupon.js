'use strict';
const moment = require('moment-timezone');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    // const expire = moment.tz('2024-26-08', 'America/Toronto').unix();
    // const create = moment.tz('2023-10-05', 'America/Toronto').unix();
    // const update = moment.tz('2022-12-06', 'America/Toronto').unix();
    return queryInterface.bulkInsert('course_coupons', [
      {
        coupon_code: '45&AD#FG',
        course_name: JSON.stringify(["course 1", "course 2"]),
        discount_in_percentage: 10,
        discount_in_amount: null,
        expired_date: new Date(),
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_coupons', null, {});
  },
};
