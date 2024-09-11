'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_coupons',
          'course_name',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'coupon_code'
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_coupons', 'course_name', { transaction: t }),
      ]);
    });
  },
};
