const { Role_Permission, Permission_Category } = require("../../database/models/index");
const { Op } = require("sequelize");

const getRolePermissionData = async (req, res) => {
    const { name } = req.query;
    try {
        const data = await Role_Permission.findAll({
            where: { role_name: name, perm_cate_id: { [Op.in]: [9, 10, 11] } }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
const checkRolePermissionData = async (req, res) => {
    const { name, permName } = req.query;
    const permCateId = await Permission_Category.findOne({ where: { name: permName } });
    try {
        const data = await Role_Permission.findAll({
            where: { role_name: name, perm_cate_id: permCateId.dataValues.id }
        });
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = { getRolePermissionData, checkRolePermissionData }