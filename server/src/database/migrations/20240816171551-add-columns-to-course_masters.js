'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_masters',
          'is_tax',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'course_discount'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'tax_name',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'is_tax'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'is_inclusive',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'tax_name'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'is_exclusive',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'is_inclusive'
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_masters', 'is_tax', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'tax_name', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'is_inclusive', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'is_exclusive', { transaction: t }),
      ]);
    });
  },
};
