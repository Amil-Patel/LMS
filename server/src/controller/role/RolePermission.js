
const { Permission_Group, Permission_Category, Role_Permission } = require("../../database/models/index");
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getRolePermissionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    try {
        const permissionCateData = await Permission_Category.findAll({
            include: [
                {
                    model: Permission_Group,
                    as: 'permission_group',
                    required: true,
                    attributes: ['name',]
                }
            ]
        });

        res.send(permissionCateData);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
const getRolePermissionDataForEdit = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const { name } = req.query;
    try {
        const rolePermissionData = await Role_Permission.findAll({
            where: { role_name: name },
        });

        res.send(rolePermissionData);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
const addRolePermissionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const permissionData = req.body;
    try {
        for (let permission of permissionData) {
            const { rollName, itemName, enable_view, enable_add, enable_edit, enable_delete } = permission;

            const permissionCategory = await Permission_Category.findOne({ where: { name: itemName } });

            if (!permissionCategory) {
                return res.status(400).send(`No permission category found for ${itemName}`);
            }

            const permCatId = permissionCategory.id;

            await Role_Permission.create({
                role_name: rollName,
                perm_cate_id: permCatId,
                can_view: enable_view,
                can_add: enable_add,
                can_edit: enable_edit,
                can_delete: enable_delete,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        res.sendStatus(200);
    } catch (error) {
        console.log('Error adding permissions:', error);
        res.sendStatus(500);
    }
}

const editRolePermissionData = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    const permissionData = req.body;
    const name = req.params.name
    try {
        for (let permission of permissionData) {
            const { permid, enable_view, enable_add, enable_edit, enable_delete } = permission;
            await Role_Permission.update({
                can_view: enable_view,
                can_add: enable_add,
                can_edit: enable_edit,
                can_delete: enable_delete
            }, { where: { perm_cate_id: permid } }, { where: { roll_name: name } });
        }
        res.sendStatus(200);
    } catch (error) {
        console.log('Error editing permissions:', error);
        res.sendStatus(500);
    }
}

module.exports = { getRolePermissionData, addRolePermissionData, getRolePermissionDataForEdit, editRolePermissionData }