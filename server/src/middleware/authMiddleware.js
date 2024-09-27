const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(console.error("No token provided"));
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return next(err);

        req.user = user;
        next();
    });
};

module.exports = authMiddleware;
