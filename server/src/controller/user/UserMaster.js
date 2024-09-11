const { UserMaster } = require("../../database/models/index");
const bcrypt = require('bcrypt');
const getUserMasterData = async (req, res) => {
    try {
        const data = await UserMaster.findAll();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserMasterDataWithId = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await UserMaster.findOne({
            where: {
                id: 1
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addUserMasterData = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        description: req.body.description,
        gender: req.body.gender,
        dob: req.body.dob || null,
        address: req.body.address,
        profile: req?.body?.profile || null,
        contact: req.body.contact,
        email: req.body.email,
        password: hashedPassword,
        facebook: req.body.facebook || null,
        linkedin: req.body.linkedin || null,
        role_id: req.body.role_id,
        status: 1,
        created_by: new Date(),
        updated_by: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    try {
        const usermasterdata = await UserMaster.create(data);
        res.status(200).json(usermasterdata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const updateUserMasterData = async (req, res) => {
    const id = req.params.id;
    const currentUser = await User.findOne({ where: { id } });
    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser && currentUser.profile) {
        const imagePath = path.join(__dirname, '../../client/public/upload', currentUser.profile);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    const data = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        description: req.body.description,
        gender: req.body.gender,
        dob: req.body.dob || null,
        address: req.body.address,
        profile: req?.body?.profile || null,
        contact: req.body.contact,
        email: req.body.email,
        facebook: req.body.facebook || null,
        linkedin: req.body.linkedin || null,
        role_id: req.body.role_id,
        status: req.body.status,
        updated_by: req.body.updated_by,
        updatedAt: new Date(),
    };
    try {
        const usermasterdata = await UserMaster.update(data, {
            where: {
                id: id
            }
        });
        res.status(200).json(usermasterdata);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUserMaster = async (req, res) => {
    const id = req.params.id;
    const currentUser = await User.findOne({ where: { id } });
    if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (currentUser && currentUser.profile) {
        const imagePath = path.join(__dirname, '../../client/public/upload', currentUser.profile);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }
    try {
        const data = await UserMaster.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getUserMasterData,
    getUserMasterDataWithId,
    addUserMasterData,
    updateUserMasterData,
    deleteUserMaster,
}
