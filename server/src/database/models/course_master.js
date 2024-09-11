'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Master.belongsTo(models.Course_Category, {
        foreignKey: 'course_cate',
        as: 'course_category'
      });
      Course_Master.hasMany(models.Course_Section, {
        foreignKey: 'course_id',
        as: 'course_master_id'
      });
      Course_Master.hasMany(models.Course_Lesson, {
        foreignKey: 'course_id',
        as: 'course_master_lesson_id'
      });
      Course_Master.hasMany(models.Course_Quize, {
        foreignKey: 'course_id',
        as: 'course_master_quize_id'
      });
      Course_Master.hasMany(models.Course_Quize_Question, {
        foreignKey: 'course_id',
        as: 'course_section_quize_question'
      });
      Course_Master.hasMany(models.academic_progress, {
        foreignKey: 'course_id',
        as: 'course_master_academic_progress'
      });
      Course_Master.hasMany(models.quize_result, {
        foreignKey: 'course_id',
        as: 'course_master_quize_result'
      });
      Course_Master.hasMany(models.enrollment, {
        foreignKey: 'course_id',
        as: 'course_master_enrollment'
      });
    }
  }
  Course_Master.init({
    course_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    short_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    long_desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    course_cate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    course_level: {
      type: DataTypes.STRING,
      allowNull: false
    },
    course_language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    drip_content: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    upcoming_course_thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publish_date: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_top_course: {
      type: DataTypes.INTEGER
    },
    featured_course: {
      type: DataTypes.INTEGER
    },
    course_faqs: {
      type: DataTypes.TEXT
    },
    course_requirenment: {
      type: DataTypes.TEXT
    },
    course_topics: {
      type: DataTypes.TEXT
    },
    course_price: {
      type: DataTypes.INTEGER
    },
    course_discount: {
      type: DataTypes.INTEGER
    },
    expiring_time: {
      type: DataTypes.STRING
    },
    no_of_month: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    course_overview_link: {
      type: DataTypes.STRING
    },
    course_thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    meta_keyword: {
      type: DataTypes.TEXT
    },
    meta_desc: {
      type: DataTypes.TEXT
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Course_Master',
  });
  return Course_Master;
};