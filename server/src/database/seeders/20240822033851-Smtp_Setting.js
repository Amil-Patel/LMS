'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('smtp_settings', [
      {
        protocol: 'smtp',
        smtp_crypto: "tls",
        smtp_host: 'smtp.gmail.com',
        smtp_port: 587,
        smtp_from_email: 'admin@example.com',
        smtp_username: 'admin@example.com',
        smtp_password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('smtp_settings', null, {});
  },
};
