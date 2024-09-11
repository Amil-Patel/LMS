'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course_Quize_Questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.TEXT
      },
      question_type: {
        type: Sequelize.STRING
      },
      no_of_option: {
        type: Sequelize.INTEGER
      },
      options: {
        type: Sequelize.TEXT
      },
      correct_answer: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.INTEGER
      },
      quize_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_quizes',
          key: 'id'
        },
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_sections',
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
    await queryInterface.dropTable('Course_Quize_Questions');
  }
};