'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course_categories', [
      {
        cate_title: 'Web Development',
        cate_parent_id: null,
        cate_thumbnail: "https://example.com/profile",
        status: 1,
        created_by: 1,
        updated_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_categories', null, {});
  },
};
