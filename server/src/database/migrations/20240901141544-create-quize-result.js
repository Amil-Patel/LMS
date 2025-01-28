'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('quize_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quize_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_quizes',
          key: 'id'
        },
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
      user_answers: {
        type: Sequelize.TEXT
      },
      correct_answers: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('quize_results');
  }
};