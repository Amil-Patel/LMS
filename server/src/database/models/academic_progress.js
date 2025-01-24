'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class academic_progress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      academic_progress.belongsTo(models.Course_Master, {
        foreignKey: 'course_id',
        as: 'course_master_academic_progress'
      });
      academic_progress.belongsTo(models.UserMaster, {
        foreignKey: 'student_id',
        as: 'user_master_academic_progress'
      });
    }
  }
  academic_progress.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    completed_lesson_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    course_progress: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    watching_duration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    current_watching_lesson: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    completed_date: {
      type: DataTypes.DATE,
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
    modelName: 'academic_progress',
  });
  return academic_progress;
};