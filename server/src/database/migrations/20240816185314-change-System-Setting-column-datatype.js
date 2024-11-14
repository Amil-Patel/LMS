'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('system_settings', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('system_settings', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('system_settings', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('system_settings', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  },
};
