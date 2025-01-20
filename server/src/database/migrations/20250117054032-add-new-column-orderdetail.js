'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'order_details',
          'is_inclusive',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'discount'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'order_details',
          'is_exclusive',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'is_inclusive'
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('order_details', 'is_inclusive', { transaction: t }),
        queryInterface.removeColumn('order_details', 'is_exclusive', { transaction: t }),
      ]);
    });
  },
};
