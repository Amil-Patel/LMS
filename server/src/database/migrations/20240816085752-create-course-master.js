'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Course_Masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_title: {
        type: Sequelize.STRING
      },
      short_desc: {
        type: Sequelize.TEXT
      },
      long_desc: {
        type: Sequelize.TEXT
      },
      course_cate: {
        type: Sequelize.INTEGER,
        references: {
          model: 'course_categories',
          key: 'id'
        },
      },
      course_level: {
        type: Sequelize.STRING
      },
      course_language: {
        type: Sequelize.STRING
      },
      drip_content: {
        type: Sequelize.INTEGER
      },
      course_status: {
        type: Sequelize.STRING
      },
      upcoming_course_thumbnail: {
        type: Sequelize.STRING
      },
      publish_date: {
        type: Sequelize.DATE
      },
      is_top_course: {
        type: Sequelize.INTEGER
      },
      featured_course: {
        type: Sequelize.INTEGER
      },
      course_faqs: {
        type: Sequelize.TEXT
      },
      course_requirenment: {
        type: Sequelize.TEXT
      },
      course_topics: {
        type: Sequelize.TEXT
      },
      course_price: {
        type: Sequelize.INTEGER
      },
      course_discount: {
        type: Sequelize.INTEGER
      },
      expiring_time: {
        type: Sequelize.STRING
      },
      no_of_month: {
        type: Sequelize.INTEGER
      },
      course_overview_link: {
        type: Sequelize.STRING
      },
      course_thumbnail: {
        type: Sequelize.STRING
      },
      meta_keyword: {
        type: Sequelize.TEXT
      },
      meta_desc: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Course_Masters');
  }
};