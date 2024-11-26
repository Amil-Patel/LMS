'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('usermasters', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'role_id', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('usermasters', 'createdAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'updatedAt', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'role_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  },
};
