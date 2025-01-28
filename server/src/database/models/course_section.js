'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Section.belongsTo(models.Course_Master, {
        foreignKey: 'course_id',
        as: 'course_master_id'
      });
      Course_Section.hasMany(models.Course_Lesson, {
        foreignKey: 'section_id',
        as: 'course_section_lesson'
      });
      Course_Section.hasMany(models.Course_Quize, {
        foreignKey: 'section_id',
        as: 'course_section_quize'
      });
      Course_Section.hasMany(models.Course_Quize_Question, {
        foreignKey: 'section_id',
        as: 'course_section_quize_question'
      });
      Course_Section.hasMany(models.resource, {
        foreignKey: 'module_id',
        as: 'course_section_resource'
      });
    }
  }
  Course_Section.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    modelName: 'Course_Section',
  });
  return Course_Section;
};