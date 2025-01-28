'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('permission_categories', [
      {
        perm_group_id: 1,
        name: 'Course Category',
        short_desc: 'Course Category',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 1,
        name: 'Course Coupon',
        short_desc: 'Course Coupon',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 1,
        name: 'Course Master',
        short_desc: 'Course Master',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 2,
        name: 'Enrollment Information',
        short_desc: 'Enrollment Information',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 3,
        name: 'Inquiry Information',
        short_desc: 'Inquiry Information',
        enable_view: 1,
        enable_add: 0,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 4,
        name: 'Payment Information',
        short_desc: 'Payment Information',
        enable_view: 1,
        enable_add: 0,
        enable_edit: 1,
        enable_delete: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 5,
        name: 'Payment Setting',
        short_desc: 'Payment Setting',
        enable_view: 0,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 5,
        name: 'Notification Setting',
        short_desc: 'Notification Setting',
        enable_view: 0,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 6,
        name: 'Student',
        short_desc: 'Student Infromation',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 6,
        name: 'Instructor',
        short_desc: 'Instructor Infromation',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        perm_group_id: 6,
        name: 'Admin',
        short_desc: 'Admin Infromation',
        enable_view: 1,
        enable_add: 1,
        enable_edit: 1,
        enable_delete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('permission_categories', null, {});
  },
};
