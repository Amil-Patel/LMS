'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.INTEGER
      },
      student_id: {
        type: Sequelize.INTEGER
      },
      course_title: {
        type: Sequelize.STRING
      },
      expiring_time: {
        type: Sequelize.STRING
      },
      no_of_month: {
        type: Sequelize.INTEGER
      },
      course_price: {
        type: Sequelize.INTEGER
      },
      tax_rate: {
        type: Sequelize.INTEGER
      },
      is_inclusive: {
        type: Sequelize.INTEGER
      },
      is_exclusive: {
        type: Sequelize.INTEGER
      },
      course_discount: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('student_carts');
  }
};