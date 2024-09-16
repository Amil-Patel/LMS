'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permission_Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      perm_group_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permission_Groups',
          key: 'id'
        },
      },
      name: {
        type: Sequelize.STRING
      },
      short_desc: {
        type: Sequelize.TEXT
      },
      enable_view: {
        type: Sequelize.INTEGER
      },
      enable_add: {
        type: Sequelize.INTEGER
      },
      enable_edit: {
        type: Sequelize.INTEGER
      },
      enable_delete: {
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
    await queryInterface.dropTable('Permission_Categories');
  }
};