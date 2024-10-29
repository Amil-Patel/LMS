const { UserMaster } = require("../../database/models/index");
const jwt = require("jsonwebtoken");
const EncryptPassword = require("../../middleware/EncryptPassword");
const DecryptPassword = require("../../middleware/DecryptPassword");
const secret_key = process.env.JWT_SECRET_KEY;
const AuthMiddleware = require("../../auth/AuthMiddleware")

const getLogin = async (req, res) => {
    const isAuthenticated = AuthMiddleware.AuthMiddleware(req, res);
    if (!isAuthenticated) return;
    let { email, password } = req.body;
    email = email.trim();

    try {
        const user = await UserMaster.findOne({
            where: { email: email },
        });

        if (!user) {
            return res.status(404).json({ message: "Invalid email or password", status: 404 });
        }

        const decryptedPassword = DecryptPassword(user.password);

        if (decryptedPassword !== password) {
            // Return an error if the password doesn't match
            return res.status(401).json({
                message: "Incorrect email or password. Please try again.",
                status: 401,
            });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role_id }, secret_key, {
            expiresIn: "1m",
        });
        // Secure cookies with expiration
        res.json({ role: user.role_id, id: user.id, status: 200, token: token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};


module.exports = { getLogin };
