'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_cart.init({
    course_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    course_title: DataTypes.STRING,
    auther: DataTypes.STRING,
    course_thumbnail: DataTypes.STRING,
    expiring_time: DataTypes.STRING,
    no_of_month: DataTypes.INTEGER,
    course_price: DataTypes.INTEGER,
    tax_rate: DataTypes.INTEGER,
    is_inclusive: DataTypes.INTEGER,
    is_exclusive: DataTypes.INTEGER,
    course_discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_cart',
  });
  return student_cart;
};