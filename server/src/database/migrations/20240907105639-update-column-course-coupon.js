'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('course_coupons', 'course_name', {
      type: Sequelize.DataTypes.JSON,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('course_coupons', 'course_name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },
};
