const User = require("../models/user");
const CryptoJS = require("crypto-js"); //for hashing the passwords
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/generateAccessToken");

const registerUser = async (req, res) => {
    try {
        // check if the user already exists
        const user = await User.findOne({ email: req.body["username"] });
        if (user)
            return res.status(409).json({
                message: "User already exists!",
            });

        // create a new user
        const newUser = new User({
            name: req.body["registration-name"],
            email: req.body["username"],
            password: CryptoJS.AES.encrypt(req.body["password"], process.env.CRYPTOJS_KEY).toString(),
        });

        await newUser.save();
        return res.status(201).json({
            message: "User successfully created!",
            "registration-name": req.body["registration-name"],
        });
    } catch (err) {
        console.log("In registerUser (userController): ", err);
        return res.status(500).json({
            message: "Error occured!",
        });
    }
};

const loginUser = async (req, res) => {
    try {
        // find the user with the entered emailid
        const user = await User.findOne({ email: req.body["username"] });
        if (!user)
            return res.status(401).json({
                message: "User not registered!",
            });

        // if user is there, check if password is correct or not
        const decryptPass = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_KEY);
        const userPassword = decryptPass.toString(CryptoJS.enc.Utf8);

        if (req.body["password"] != userPassword)
            return res.status(401).json({
                message: "Invalid credentials!",
            });
        
        const token = generateAccessToken({userId: user._id});
        
        res.status(201).json({
            message: "User logged in successfully!",
            token: token
        });
    } catch (err) {
        console.log("In loginUser (userController): ", err);
        res.status(500).json({
            message: "Error occured!"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
};
