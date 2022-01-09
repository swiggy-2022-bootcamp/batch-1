const jwt = require('jsonwebtoken');
const tokenOperations = {
    generateToken(username){
        var token = jwt.sign({username},process.env.SECRET,{ expiresIn: '24h' });
        return token;
    },
    verifyToken(token){
        var decoded = jwt.verify(token,process.env.SECRET);
        return decoded;
    }

}
module.exports = tokenOperations;

