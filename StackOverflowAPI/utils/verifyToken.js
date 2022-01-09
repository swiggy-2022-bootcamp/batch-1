const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if(!token) 
        return res.status(401).json({message: "Not authenticated! No token provided!"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) {
            console.log("Error while verifying jwt (verifyToken): ", err);
            return res.status(403).json({
                message: "Access to resource forbidden!"
            })
        }

        req.user = user;
        next();
    })
}

module.exports = verifyToken;