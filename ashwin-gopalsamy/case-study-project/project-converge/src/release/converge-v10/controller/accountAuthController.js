const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
                "message":"Access Denied"
        });
    };
    try {
        let user = await JWT.verify(token, "141fqj1rqfjm1ng10f1rtqwv");
        req.user = user.email;
        next();
    } catch (error) {
        return res.status(401).json({
            "errors": [{
                "msg": "Invalid JWT Token"
            }]
        });
    }
}