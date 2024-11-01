'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Email_Notifiacation_Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      is_editable: {
        type: Sequelize.INTEGER
      },
      addon_identifier: {
        type: Sequelize.STRING
      },
      user_types: {
        type: Sequelize.STRING
      },
      system_notification: {
        type: Sequelize.STRING
      },
      email_notification: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      template: {
        type: Sequelize.TEXT
      },
      setting_title: {
        type: Sequelize.STRING
      },
      setting_sub_title: {
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
    await queryInterface.dropTable('Email_Notifiacation_Settings');
  }
};