'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('quize_results', 'correct_answers', {
      type: Sequelize.JSON,
      allowNull: false,
    });
    await queryInterface.changeColumn('quize_results', 'user_answers', {
      type: Sequelize.JSON,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('quize_results', 'correct_answers', {
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('quize_results', 'user_answers', {
      type: Sequelize.STRING,
    });
  },
};
