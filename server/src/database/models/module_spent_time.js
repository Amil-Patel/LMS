"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class module_spent_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  module_spent_time.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      module_id: DataTypes.INTEGER,
      spent_time: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "module_spent_time",
      tableName: "module_spent_times",
    }
  );
  return module_spent_time;
};
