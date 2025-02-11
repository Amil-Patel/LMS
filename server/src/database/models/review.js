"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  review.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      review: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "review",
      tableName: "reviews",
    }
  );
  return review;
};
