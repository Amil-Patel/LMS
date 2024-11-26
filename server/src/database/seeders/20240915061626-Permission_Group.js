'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permission_groups', [
      {
        name: 'Course',
        short_desc: 'Course Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Enrollment',
        short_desc: 'Enrollment Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Inquiry',
        short_desc: 'Inquiry Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Payment',
        short_desc: 'Payment Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Setting',
        short_desc: 'Setting Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User',
        short_desc: 'User Group',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permission_groups', null, {});
  },
};
