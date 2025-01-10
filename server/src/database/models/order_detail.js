'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      order_detail.belongsTo(models.order, {
        foreignKey: 'order_id',
        as: 'order_detail_id'
      });
    }
  }
  order_detail.init({
    order_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER,
    course_title: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    course_amount: DataTypes.INTEGER,
    course_tax: DataTypes.INTEGER,
    course_taxamount: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};