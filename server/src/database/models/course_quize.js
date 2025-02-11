"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_Quize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Quize.belongsTo(models.Course_Master, {
        foreignKey: "course_id",
        as: "course_master",
      });
      Course_Quize.belongsTo(models.Course_Section, {
        foreignKey: "section_id",
        as: "course_section_quize",
      });
      Course_Quize.hasMany(models.Course_Quize_Question, {
        foreignKey: "quize_id",
        as: "course_section_quize_question",
      });
      Course_Quize.hasMany(models.quize_result, {
        foreignKey: "quize_id",
        as: "course_section_quize_result",
      });
      Course_Quize.hasMany(models.Course_Lesson, {
        foreignKey: "quiz_id",
        as: "course_quize_lesson",
      });
    }
  }
  Course_Quize.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      section_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quize_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expire_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      passing__marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      drip_content: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      no_of_q_retakes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_showing_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      random_questions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_count_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      is_skipable: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instruction: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Course_Quize",
      tableName: "course_quizes",
    }
  );
  return Course_Quize;
};
