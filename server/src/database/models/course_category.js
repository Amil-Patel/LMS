'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course_Category.hasMany(models.Course_Master, {
        foreignKey: 'course_cate',
        as: 'course_category'
      });
    }
  }
  Course_Category.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false
    },
    cate_title: {
      type: DataTypes.STRING,
    },
    cate_parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    cate_thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER
    },
    created_by: {
      type: DataTypes.INTEGER
    },
    updated_by: {
      type: DataTypes.INTEGER
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
    modelName: 'Course_Category',
    timestamps: false
  });
  return Course_Category;
};