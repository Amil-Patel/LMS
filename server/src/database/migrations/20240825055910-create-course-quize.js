'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course_Quizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
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
      quize_duration: {
        type: Sequelize.INTEGER
      },
      total_marks: {
        type: Sequelize.INTEGER
      },
      passing__marks: {
        type: Sequelize.INTEGER
      },
      drip_content: {
        type: Sequelize.INTEGER
      },
      no_of_q_retakes: {
        type: Sequelize.INTEGER
      },
      instruction: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Course_Quizes');
  }
};