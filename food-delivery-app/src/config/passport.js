const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
// const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const tokenTypes = {
  ACCESS: 'access',
  REFRESH: 'refresh',
  RESET_PASSWORD: 'resetPassword',
};

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      // return done(new Error('Invalid token type'), false);
      throw new Error('Invalid token type');
    }
    const user = await User.findOne({ _id: payload.sub }).exec();
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
