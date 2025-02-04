'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'order_details',
          'coupon_discount_amount',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'discount'
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('order_details', 'coupon_discount_amount', { transaction: t })
      ]);
    });
  },
};
