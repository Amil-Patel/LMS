'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_masters',
          'meta_tag',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'course_thumbnail'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'canonical_url',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'meta_desc'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'title_tag',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'canonical_url'
          },
          { transaction: t },
        ),

        queryInterface.addColumn(
          'course_sections',
          'order',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'course_id'
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_masters', 'meta_tag', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'canonical_url', { transaction: t }),
        queryInterface.removeColumn('course_sections', 'order', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'title_tag', { transaction: t }),
      ]);
    });
  },
};
