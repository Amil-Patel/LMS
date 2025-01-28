'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_quizes',
          'expire_time',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'quize_duration'
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_quizes', 'expire_time', { transaction: t }),
      ]);
    });
  },
};
