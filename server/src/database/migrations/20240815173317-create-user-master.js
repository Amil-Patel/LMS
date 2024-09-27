'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserMasters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      middle_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      gender: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      profile: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      linkedin: {
        type: Sequelize.STRING
      },
      role_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
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
    await queryInterface.dropTable('UserMasters');
  }
};