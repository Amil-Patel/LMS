'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Course_Masters', 'drip_content', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('Course_Masters', 'is_top_course', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('Course_Masters', 'featured_course', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'status', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Course_Masters', 'drip_content', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('Course_Masters', 'is_top_course', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('Course_Masters', 'featured_course', {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'status', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },
};
