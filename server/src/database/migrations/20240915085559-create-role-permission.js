'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Role_Permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role_name: {
        type: Sequelize.STRING
      },
      perm_cate_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Permission_Categories',
          key: 'id'
        },
      },
      can_view: {
        type: Sequelize.INTEGER
      },
      can_add: {
        type: Sequelize.INTEGER
      },
      can_edit: {
        type: Sequelize.INTEGER
      },
      can_delete: {
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
    await queryInterface.dropTable('Role_Permissions');
  }
};
