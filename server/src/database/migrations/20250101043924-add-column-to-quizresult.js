'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'quize_results',
          'result',
          {
            type: Sequelize.DataTypes.TEXT,
            after: 'correct_answers'
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'quize_results',
          'result',
          {
            type: Sequelize.DataTypes.TEXT,
            after: 'correct_answers'
          },
          { transaction: t },
        )
      ]);
    });
  },
};
