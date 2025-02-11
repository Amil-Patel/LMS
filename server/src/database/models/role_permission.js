"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role_Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role_Permission.belongsTo(models.Permission_Category, {
        foreignKey: "perm_cate_id",
        as: "permission_category",
      });
    }
  }
  Role_Permission.init(
    {
      role_name: DataTypes.STRING,
      perm_cate_id: DataTypes.INTEGER,
      can_view: DataTypes.INTEGER,
      can_add: DataTypes.INTEGER,
      can_edit: DataTypes.INTEGER,
      can_delete: DataTypes.INTEGER,
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
      modelName: "Role_Permission",
      tableName: "role_permissions",
    }
  );
  return Role_Permission;
};
