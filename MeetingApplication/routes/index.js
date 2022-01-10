const { Router } = require("express");
const router = Router();
const passport = require("passport");
// authentication check middleware
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middleware/checkauth");
// validation functions
const {
  validateName,
  validateEmail,
  validatePassword,
} = require("../utils/validator");
const { registerUser } = require("../controllers/userController");
// response function
const { sendResponse } = require("../utils/response");

// user routes
router.use("/user", checkAuthenticated, require("./userRoute"));
// meeting routes
router.use("/meeting", checkAuthenticated, require("./meetingRoute"));
// team routes
router.use("/team", checkAuthenticated, require("./teamRoute"));

// home route
router.get("/", checkAuthenticated, (_, res) =>
  sendResponse(res, 201, "You are at Home Page.")
);

// login page (GET)
router.get("/login", checkNotAuthenticated, (_, res) =>
  sendResponse(res, 201, "You are at Login Page.")
);

// login user (POST)
router.post("/login", checkNotAuthenticated, async (req, res, next) => {
  passport.authenticate("local", (err, user, message) => {
    if (err) return sendResponse(res, 401, "Error occurred. Please try again.");
    if (!user) return sendResponse(res, 401, message);

    // custom authentication requires to login usign req.logIn
    req.logIn(user, function (err) {
      if (err) return next(err);
      req.session.passport.username = user.user_id;
      return sendResponse(res, 201, message);
    });
  })(req, res, next);
});

// register user
router.post("/register", checkNotAuthenticated, async (req, res) => {
  let { registration_name, user_id, password } = req.body;
  // check validity of registration, user_id, password validation
  if (
    validateName(registration_name) &&
    validateEmail(user_id) &&
    validatePassword(password)
  ) {
    let reg_user = await registerUser({ registration_name, user_id, password });
    if (reg_user == null)
      sendResponse(
        res,
        401,
        "Email already exists. Please use a different email id."
      );
    else {
      req.logIn(reg_user, function (err) {
        if (err) return next(err);
        req.session.passport.username = reg_user.user_id;
        sendResponse(res, 201, "User registered successfully.", {
          registration_name,
        });
      });
    }
  } else {
    // input details are not valid
    sendResponse(
      res,
      401,
      "Input not valid. Check if input values are in correct format."
    );
  }
});

// logout user
router.post("/logout", checkAuthenticated, (req, res) => {
  req.logOut();
  sendResponse(res, 201, "Successfully logged out.");
});

// wrong routes
router.use((_, res) => sendResponse(res, 404, "Invalid route."));

module.exports = router;
