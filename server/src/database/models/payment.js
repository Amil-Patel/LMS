'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      payment.belongsTo(models.UserMaster, {
        foreignKey: 'student_id',
        as: 'user_payment'
      });
    }
  }
  payment.init({
    student_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    amount: DataTypes.STRING,
    payment_mode: DataTypes.STRING,
    transiction_id: DataTypes.INTEGER,
    bill_mobile: DataTypes.STRING,
    bill_name: DataTypes.STRING,
    bill_address: DataTypes.STRING,
    bill_gst: DataTypes.STRING,
    bill_pan: DataTypes.STRING,
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
    modelName: 'payment',
  });
  return payment;
};