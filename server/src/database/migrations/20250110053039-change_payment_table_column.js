'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'payments',
          'status',
          {
            type: Sequelize.DataTypes.TEXT,
            after: 'bill_pan'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'payments',
          'note',
          {
            type: Sequelize.DataTypes.TEXT,
            after: 'payment_mode'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'payments',
          'order_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'student_id'
          },
          { transaction: t },
        ),
        queryInterface.removeColumn('payments', 'courses', { transaction: t })
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('payments', 'status', { transaction: t }),
        queryInterface.removeColumn('payments', 'note', { transaction: t }),
        queryInterface.removeColumn('payments', 'order_id', { transaction: t }),
        queryInterface.removeColumn('payments', 'courses', { transaction: t }),
      ]);
    });
  },
};
