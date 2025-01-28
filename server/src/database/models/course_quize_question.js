'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Quize_Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Quize_Question.belongsTo(models.Course_Master, {
        foreignKey: 'course_id',
        as: 'course_master'
      });
      Course_Quize_Question.belongsTo(models.Course_Section, {
        foreignKey: 'section_id',
        as: 'course_section_quize_question'
      });
      Course_Quize_Question.belongsTo(models.Course_Quize, {
        foreignKey: 'quize_id',
        as: 'course_quize'
      });
    }
  }
  Course_Quize_Question.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    title: DataTypes.TEXT,
    question_type: DataTypes.STRING,
    no_of_option: DataTypes.INTEGER,
    options: DataTypes.TEXT,
    correct_answer: DataTypes.STRING,
    order: DataTypes.INTEGER,
    quize_id: DataTypes.INTEGER,
    section_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
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
    modelName: 'Course_Quize_Question',
  });
  return Course_Quize_Question;
};