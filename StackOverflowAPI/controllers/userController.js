const User = require("../models/user");
const CryptoJS = require("crypto-js"); //for hashing the passwords
const generateAccessToken = require("../utils/generateAccessToken");
const {
    requestConflict,
    createSuccess,
    internalServerError,
    unauthorizedError,
} = require("../utils/responseTypes");

const registerUser = async (req, res) => {
    try {
        // check if the user already exists
        const user = await User.findOne({ email: req.body["username"] });
        if (user) return requestConflict(res, "User already exists!")

        // create a new user
        const newUser = new User({
            name: req.body["registration-name"],
            email: req.body["username"],
            password: CryptoJS.AES.encrypt(req.body["password"], process.env.CRYPTOJS_KEY).toString(),
        });

        await newUser.save();
        return createSuccess(res, "User successfully created!", { 
            "registration-name": req.body["registration-name"] 
        })
    } catch (err) {
        console.log("In registerUser (userController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

const loginUser = async (req, res) => {
    try {
        // find the user with the entered emailid
        const user = await User.findOne({ email: req.body["username"] });
        if (!user) return unauthorizedError(res, "User not registered!");

        // if user is there, check if password is correct or not
        const decryptPass = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);
        const userPassword = decryptPass.toString(CryptoJS.enc.Utf8);

        if (req.body["password"] != userPassword)
            return unauthorizedError(res, "Invalid credentials!");

        // since the user has logged in, generate and give him an JWT access token
        const token = generateAccessToken({ userId: user._id });
        return createSuccess(res, "User logged in successfully!", { token });
    } catch (err) {
        console.log("In loginUser (userController): ", err);
        return internalServerError(res, "Error occured!");
    }
};

module.exports = {
    registerUser,
    loginUser,
};
