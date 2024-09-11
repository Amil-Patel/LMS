'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course_quize_questions', [
      {
        title: 'Introduction',
        question_type: 'multiple_choice',
        no_of_option: 4,
        options: JSON.stringify(["option 1", "option 2", "option 3", "option 4"]),
        correct_answer: JSON.stringify(["option 1"]),
        order: 0,
        quize_id: 1,
        section_id: 1,
        course_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_quize_questions', null, {});
  },
};
