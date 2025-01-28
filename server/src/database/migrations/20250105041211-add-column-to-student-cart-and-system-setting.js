'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'system_settings',
          'symbol',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'currency'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'student_carts',
          'auther',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'course_title'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'student_carts',
          'course_thumbnail',
          {
            type: Sequelize.DataTypes.STRING
            ,
            after: 'auther'
          },
          { transaction: t },
        )
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('system_settings', 'symbol', { transaction: t }),
        queryInterface.removeColumn('student_carts', 'auther', { transaction: t }),
        queryInterface.removeColumn('student_carts', 'course_thumbnail', { transaction: t }),
      ]);
    });
  },
};
