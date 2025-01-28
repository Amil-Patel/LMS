'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('academic_progresses', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('academic_progresses', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('currencies', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('currencies', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('email_notifiacation_settings', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('email_notifiacation_settings', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('enrollments', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('enrollments', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('payment_getways', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('payment_getways', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('quize_results', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('quize_results', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('smtp_settings', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('smtp_settings', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('academic_progresses', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('academic_progresses', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('currencies', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('currencies', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('email_notifiacation_settings', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('email_notifiacation_settings', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('enrollments', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('enrollments', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('payment_getways', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('payment_getways', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('quize_results', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('quize_results', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('smtp_settings', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('smtp_settings', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  },
};
