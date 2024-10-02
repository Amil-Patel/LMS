
const Api_keys = process.env.REACT_APP_PUBLIC_API_AUTH_KEY;

const AuthMiddleware = (req, res) => {
    console.log(req.headers)
    const apiKey = req.headers['lms-api-key'];
    if (apiKey !== Api_keys) {
        res.status(401).json({ error: "Access Denied" });
        return false;  // Return false if authentication fails
    }   
    console.log("object")
    return true;  // Return true if authentication is successful
};

module.exports = { AuthMiddleware }