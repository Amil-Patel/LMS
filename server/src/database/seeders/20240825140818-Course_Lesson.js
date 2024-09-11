'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course_lessons', [
      {
        title: 'Introduction',
        duration: 10,
        course_id: 2,
        section_id: 1,
        lesson_type: 'video',
        url: "https://www.youtube.com/watch?v=JGnGZbLXwNc",
        description: 'Introduction',
        minimum_duration: 10,
        drip_content: 0,
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_lessons', null, {});
  },
};
