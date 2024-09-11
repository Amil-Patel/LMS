'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
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
      courses: {
        type: Sequelize.TEXT
      },
      amount: {
        type: Sequelize.STRING
      },
      payment_mode: {
        type: Sequelize.STRING
      },
      transiction_id: {
        type: Sequelize.INTEGER
      },
      bill_mobile: {
        type: Sequelize.INTEGER
      },
      bill_name: {
        type: Sequelize.STRING
      },
      bill_address: {
        type: Sequelize.STRING
      },
      bill_gst: {
        type: Sequelize.STRING
      },
      bill_pan: {
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
    await queryInterface.dropTable('payments');
  }
};