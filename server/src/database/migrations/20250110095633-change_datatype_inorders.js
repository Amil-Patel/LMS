'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'academic_progresses',
          'watching_duration',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'course_progress'
          },
          { transaction: t },
        ),
      ]);

    });
    await queryInterface.changeColumn('order_details', 'course_amount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'course_tax', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'course_taxamount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'discount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('orders', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('orders', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('academic_progresses', 'watching_duration', { transaction: t }),
      ]);
    });
    await queryInterface.changeColumn('order_details', 'course_amount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'course_tax', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'course_taxamount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'discount', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('order_details', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('orders', 'createdAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('orders', 'updatedAt', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
    });
  }
};
