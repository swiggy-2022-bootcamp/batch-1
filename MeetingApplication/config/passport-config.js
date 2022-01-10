// using passport authentication
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const User = require("../models/user");

/**
 * Function to initialize passport session
 * @param {Passport.Object} passport - Passport object
 */
const initializePassport = (passport) => {
  /**
   * Authentication function passed for local strategy
   * @param {string} user_id - typed in user_id
   * @param {string} password - typed in password
   * @param {function} done - callback function called after req is authenticated.
   */
  const authenticateUser = (user_id, password, done) => {
    // Match user with the help of user_id
    User.findOne({ user_id }).then((user) => {
      if (!user) {
        return done(null, false, "This email is not registered.");
      }
      // Match hashed password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        // if password matched
        if (isMatch)
          return done(null, user, "Credentials verified. Logged In.");
        // incorrect password
        return done(null, false, "Incorrect password.");
      });
    });
  };

  // use passport local strategy
  passport.use(
    new LocalStrategy({ usernameField: "user_id" }, authenticateUser)
  );

  // serializing the user
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // deserializing the user
  passport.deserializeUser((id, done) => {
    return done(null, User.findById(id));
  });
};

module.exports = initializePassport;
