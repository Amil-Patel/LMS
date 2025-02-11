"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permission_Category.belongsTo(models.Permission_Group, {
        foreignKey: "perm_group_id",
        as: "permission_group",
      });
      Permission_Category.hasMany(models.Role_Permission, {
        foreignKey: "perm_cate_id",
        as: "permission_category",
      });
    }
  }
  Permission_Category.init(
    {
      perm_group_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      short_desc: DataTypes.TEXT,
      enable_view: DataTypes.INTEGER,
      enable_add: DataTypes.INTEGER,
      enable_edit: DataTypes.INTEGER,
      enable_delete: DataTypes.INTEGER,
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
      modelName: "Permission_Category",
      tableName: "permission_categories",
    }
  );
  return Permission_Category;
};
