'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('academic_progresses', [
      {
        student_id: 1,
        course_id: 1,
        completed_lesson_id: JSON.stringify([1, 2]),
        course_progress: 50,
        current_watching_lesson: 3,
        completed_date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('academic_progresses', null, {});
  },
};
