'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Course_Masters', 'course_price', {
      type: Sequelize.STRING,
      allowNull: false, // Adjust this based on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Course_Masters', 'course_price', {
      type: Sequelize.STRING, // Use the original data type
      allowNull: false, // Adjust this based on your requirements
    });
  }
};
