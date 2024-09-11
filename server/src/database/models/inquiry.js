'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inquiry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  inquiry.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile_number: DataTypes.INTEGER,
    whatsapp_number: DataTypes.INTEGER,
    country: DataTypes.STRING,
    message: DataTypes.STRING,
    is_registreted: DataTypes.INTEGER,
    summery: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'inquiry',
  });
  return inquiry;
};