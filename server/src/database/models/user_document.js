"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user_document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_document.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
      attachment: DataTypes.STRING,
      status: DataTypes.STRING,
      message: { type: DataTypes.TEXT, allowNull: true },
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
      modelName: "user_document",
      tableName: "user_documents",
    }
  );
  return user_document;
};
