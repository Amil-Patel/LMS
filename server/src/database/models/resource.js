'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      resource.belongsTo(models.Course_Lesson, {
        foreignKey: 'lesson_id',
        as: 'course_lesson_resource'
      });
      resource.belongsTo(models.Course_Section, {
        foreignKey: 'module_id',
        as: 'course_section_resource'
      });
    }
  }
  resource.init({
    module_id: DataTypes.INTEGER,
    lesson_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    link: DataTypes.STRING,
    status: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'resource',
  });
  return resource;
};