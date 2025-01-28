'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('academic_progresses', 'completed_date', {
      type: Sequelize.INTEGER,
      allowNull: false, // Adjust this based on your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('academic_progresses', 'completed_date', {
      type: Sequelize.DATE, // Use the original data type
      allowNull: false, // Adjust this based on your requirements
    });
  }
};
