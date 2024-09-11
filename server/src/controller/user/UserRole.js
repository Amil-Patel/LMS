const { UserRole } = require("../../database/models/index");

const getUserRoleData = async (req, res) => {
    try {
        const data = await UserRole.findAll();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const getUserRoleDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = UserRole.findeOne({
            where: {
                id: id
            }
        })
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const addUserRoleData = async (req, res) => {
    const data = {
        roll_name: req.body.roll_name,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
    }
    try {
        const userroledata = await UserRole.create(data);
        res.staus(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


const updateUserROleData = async (req, res) => {
    const id = req.params.id;
    const data = {
        roll_name: req.body.roll_name,
        status: req.body.status,
        updatedAt: req.body.updatedAt,
    }
    try {
        const userroledata = await UserRole.update(data, {
            where: {
                id: id
            }
        })
        res.status(200).json(userroledata);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

const deleteUserRoleData = async (req, res) => {
    const id = req.params.id;
    try {
        const userroledata = await UserRole.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}


module.exports = {
    getUserRoleData,
    getUserRoleDataWithId,
    addUserRoleData,
    updateUserROleData,
    deleteUserRoleData
}