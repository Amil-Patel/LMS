"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course_Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Course_Coupon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
      },
      coupon_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      course_name: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      discount_in_percentage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount_in_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      expired_date: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Course_Coupon",
      tableName: "course_coupons",
      timestamps: false,
    }
  );
  return Course_Coupon;
};
