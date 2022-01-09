const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) 
        return res.status(401).json({ message: "Not authenticated. No token provided!" });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
        if (err)
            return res.status(403).json({
                message: "Access to resource forbidden. Invalid signature!",
            });

        req.userId = data.userId;
        next();
    });
};

module.exports = verifyToken;
