'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('quize_results', [
      {
        quize_id: 1,
        student_id: 1,
        course_id: 1,
        user_answers: JSON.stringify(["option 1"]),
        correct_answers: JSON.stringify(["option 1"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        quize_id: 2,
        student_id: 2,
        course_id: 1,
        user_answers: JSON.stringify(["option 1"]),
        correct_answers: JSON.stringify(["option 1"]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('quize_results', null, {});
  },
};
