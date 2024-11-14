'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('academic_progresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'usermasters',
          key: 'id'
        },
      },
      course_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_masters',
          key: 'id'
        },
      },
      completed_lesson_id: {
        type: Sequelize.TEXT
      },
      course_progress: {
        type: Sequelize.INTEGER
      },
      current_watching_lesson: {
        type: Sequelize.INTEGER
      },
      completed_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('academic_progresses');
  }
};