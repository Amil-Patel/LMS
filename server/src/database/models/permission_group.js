'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission_Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission_Group.hasMany(models.Permission_Category, {
        foreignKey: 'perm_group_id',
        as: 'permission_group'
      });
    }
  }
  Permission_Group.init({
    name: DataTypes.STRING,
    short_desc: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Permission_Group',
  });
  return Permission_Group;
};