'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class quize_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      quize_result.belongsTo(models.Course_Master, {
        foreignKey: 'course_id',
        as: 'course_master'
      });
      quize_result.belongsTo(models.Course_Quize, {
        foreignKey: 'quize_id',
        as: 'course_quize'
      });
      quize_result.belongsTo(models.UserMaster, {
        foreignKey: 'student_id',
        as: 'user_master'
      });
    }
  }
  quize_result.init({
    quize_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    course_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_answers: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    correct_answers: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'quize_result',
  });
  return quize_result;
};