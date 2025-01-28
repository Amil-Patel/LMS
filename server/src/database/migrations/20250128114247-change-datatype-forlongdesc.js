'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_sections',
          'time',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'title'
          },
          { transaction: t },
        ),
      ]);

    });
    await queryInterface.changeColumn('course_masters', 'long_desc', {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('course_lessons', 'text_content', {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    });
    await queryInterface.changeColumn('user_documents', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('user_documents', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_sections', 'time', { transaction: t }),
      ]);
    });
    await queryInterface.changeColumn('course_masters', 'long_desc', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('course_lessons', 'text_content', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('user_documents', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('user_documents', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  },
};
