'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class smtp_setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  smtp_setting.init({
    protocol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smtp_crypto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smtp_host: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smtp_port: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    smtp_from_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smtp_username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smtp_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'smtp_setting',
  });
  return smtp_setting;
};