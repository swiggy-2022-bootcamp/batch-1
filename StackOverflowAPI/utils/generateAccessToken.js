const jwt = require('jsonwebtoken');

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '1800s'
    })
}

module.exports = generateAccessToken;