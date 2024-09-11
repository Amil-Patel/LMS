'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course_quizes', [
      {
        title: 'Introduction',
        section_id: 1,
        course_id: 1,
        quize_duration: 10,
        total_marks: 10,
        passing__marks: 5,
        drip_content: 0,
        no_of_q_retakes: 1,
        instruction: "Introduction",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_quizes', null, {});
  },
};
