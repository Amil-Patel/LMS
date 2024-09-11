'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          'course_lessons',
          'attachment',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'url'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'thumbnail_preview_image_url',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'attachment'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'text_content',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'thumbnail_preview_image_url'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'is_preview',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'text_content'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'status',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'is_preview'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'quiz_id',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'status'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_lessons',
          'is_count_time',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'quiz_id'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_quizes',
          'total_showing_questions',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'no_of_q_retakes'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_quizes',
          'random_questions',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'total_showing_questions'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_quizes',
          'status',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'random_questions'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_quizes',
          'is_count_time',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'status'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_quizes',
          'is_skipable',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'is_count_time'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'usermasters',
          'whatsapp_number',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'contact'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'usermasters',
          'country',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'whatsapp_number'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'userroles',
          'type',
          {
            type: Sequelize.DataTypes.STRING,
            after: 'roll_name'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'tax_rate',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'tax_name'
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'course_masters',
          'auther',
          {
            type: Sequelize.DataTypes.INTEGER,
            after: 'is_exclusive'
          },
          { transaction: t },
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('course_lessons', 'attachment', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'thumbnail_preview_image_url', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'text_content', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'is_preview', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'status', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'quiz_id', { transaction: t }),
        queryInterface.removeColumn('course_lessons', 'is_count_time', { transaction: t }),
        queryInterface.removeColumn('course_quizes', 'total_showing_questions', { transaction: t }),
        queryInterface.removeColumn('course_quizes', 'random_questions', { transaction: t }),
        queryInterface.removeColumn('course_quizes', 'status', { transaction: t }),
        queryInterface.removeColumn('course_quizes', 'is_count_time', { transaction: t }),
        queryInterface.removeColumn('course_quizes', 'is_skipable', { transaction: t }),
        queryInterface.removeColumn('usermasters', 'whatsapp_number', { transaction: t }),
        queryInterface.removeColumn('usermasters', 'country', { transaction: t }),
        queryInterface.removeColumn('userroles', 'type', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'tax_rate', { transaction: t }),
        queryInterface.removeColumn('course_masters', 'auther', { transaction: t }),
      ]);
    });
  },
};
