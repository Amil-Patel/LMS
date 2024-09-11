'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {  
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('System_Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      timezone: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      position: {
        type: Sequelize.STRING
      },
      email_verification: {
        type: Sequelize.INTEGER
      },
      max_authorized_device: {
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
    await queryInterface.dropTable('System_Settings');
  }
};