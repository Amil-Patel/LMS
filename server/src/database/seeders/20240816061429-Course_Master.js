'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('course_masters', [
      {
        course_title: 'Development',
        short_desc: 'this is for web developer course',
        long_desc: 'this is for web developer and it is very good course for Beginner.',
        course_cate: 1,
        course_level: 'Beginner',
        course_language: 'English',
        drip_content: 1,
        course_status: "upcoming",
        upcoming_course_thumbnail: "https://example.com/profile",
        publish_date: new Date(),
        is_top_course: 1,
        featured_course: 1,
        course_faqs: JSON.stringify({
          "What is html": "html is hypertext markup language",
          "What is css": "cascading style sheet",
          "What is js": "java script"
        }),
        course_requirenment: JSON.stringify(["login", "register"]),
        course_topics: JSON.stringify(["html", "css", "js", "react", "angular"]),
        course_price: 1000,
        course_discount: 10,
        is_tax: 1,
        tax_name: "tax",
        is_inclusive: 1,
        is_exclusive: 1,
        expiring_time: "limited time",
        no_of_month: 4,
        course_overview_link: "https://example.com/profile",
        course_thumbnail: "https://example.com/profile",
        meta_tag: JSON.stringify(["html", "css", "js"]),
        meta_keyword: JSON.stringify(["html", "css", "js"]),
        meta_desc: "this is for web developer and it is very good course for Beginner.",
        canonical_url: "https://example.com/profile",
        title_tag: "this is for web developer and it is very good course for Beginner.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('course_masters', null, {});
  },
};
