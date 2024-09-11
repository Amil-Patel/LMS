'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Email_Notifiacation_Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Email_Notifiacation_Setting.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_editable: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    addon_identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_types: {
      type: DataTypes.STRING,
      allowNull: false
    },
    system_notification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_notification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    template: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    setting_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    setting_sub_title: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Email_Notifiacation_Setting',
  });
  return Email_Notifiacation_Setting;
};