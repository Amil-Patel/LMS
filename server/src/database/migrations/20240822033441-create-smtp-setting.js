'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('smtp_settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      protocol: {
        type: Sequelize.STRING
      },
      smtp_crypto: {
        type: Sequelize.STRING
      },
      smtp_host: {
        type: Sequelize.STRING
      },
      smtp_port: {
        type: Sequelize.INTEGER
      },
      smtp_from_email: {
        type: Sequelize.STRING
      },
      smtp_username: {
        type: Sequelize.STRING
      },
      smtp_password: {
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
    await queryInterface.dropTable('smtp_settings');
  }
};