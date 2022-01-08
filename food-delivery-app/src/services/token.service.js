const jwt = require('jsonwebtoken');
const config = require('../config/config');

const tokenTypes = {
  ACCESS: "access",
  REFRESH: "refresh",
  RESET_PASSWORD: "resetPassword",
};

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  return jwt.sign(
    {
      sub: userId,
      type: type,
      exp: expires,
    },
    secret
  );
};

const generateAuthTokens = async (user) => {
  const exp = config.jwt.accessExpirationMinutes * 60;
  const time = new Date();
  const secs = Math.floor(time / 1000) + exp;
  time.setSeconds(time.getSeconds() + exp);
  const token = generateToken(
    user._id, //_id
    secs,
    tokenTypes.ACCESS,
    config.jwt.secret
  );
  return {
    access: {
      token: token,
      expires: time,
    },
  };
};

module.exports = {
  generateToken,
  generateAuthTokens,
};
