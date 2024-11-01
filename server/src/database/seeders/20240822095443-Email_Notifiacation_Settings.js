'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('email_notifiacation_settings', [
      {
        type: 'sighnup',
        is_editable: 1,
        addon_identifier: null,
        user_types: JSON.stringify(['admin', 'user']),
        system_notification: JSON.stringify({
          'admin': '1',
          'user': '1'
        }),
        email_notification: JSON.stringify({
          'admin': '0',
          'user': '0'
        }),
        subject: JSON.stringify({
          'admin': 'new user registered',
          'user': 'registration successful'
        }),
        template: JSON.stringify({
          'admin': 'new user registered:[username] User Email:[useremail]',
          'user': 'ypu are successfully registered with us at:[systemname]'
        }),
        setting_title: 'New user Registration',
        setting_sub_title: 'Get notified when a new user signs up',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('email_notifiacation_settings', null, {});
  },
};
