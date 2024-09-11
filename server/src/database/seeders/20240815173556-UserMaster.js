'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('amilpatel@123', 10);
    return queryInterface.bulkInsert('usermasters', [
      {
        first_name: 'Aamil',
        middle_name: 'Arif',
        last_name: 'Patel',
        description: 'This application is LMS application.',
        gender: 'Male',
        dob: new Date('2002-01-01'),
        address: 'Majadar',
        profile: 'https://example.com/profile',
        contact: 7698316261,
        email: 'patelaamil509@gmail.com',
        password: hashedPassword,
        facebook: 'https://www.facebook.com/johndoe',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        role_id: 1,
        status: 1,
        created_by: 1,
        updated_by: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usermasters', null, {});
  },
};
