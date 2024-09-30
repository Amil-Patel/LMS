'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Lesson.belongsTo(models.Course_Master, {
        foreignKey: 'course_id',
        as: 'course_master_lesson_id'
      });
      Course_Lesson.belongsTo(models.Course_Section, {
        foreignKey: 'section_id',
        as: 'course_section_lesson'
      });
      Course_Lesson.belongsTo(models.Course_Quize, {
        foreignKey: 'quiz_id',
        as: 'course_quize_lesson'
      });
    }
  }
  Course_Lesson.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    section_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lesson_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: true
    },
    thumbnail_preview_image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    text_content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    is_preview: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    is_count_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    minimum_duration: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drip_content: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    modelName: 'Course_Lesson',
  });
  return Course_Lesson;
};