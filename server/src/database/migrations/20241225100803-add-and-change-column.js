'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_masters',
          'status',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'title_tag'
          },
          { transaction: t },
        ),
      ]);

    });
    await queryInterface.changeColumn('usermasters', 'contact', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'whatsapp_number', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'bill_mobile', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'mobile_number', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'whatsapp_number', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_master', 'status', { transaction: t }),
      ]);
    });

    await queryInterface.changeColumn('usermasters', 'contact', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('usermasters', 'whatsapp_number', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('payments', 'bill_mobile', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'mobile_number', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn('inquiries', 'whatsapp_number', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
    });
  },
};
