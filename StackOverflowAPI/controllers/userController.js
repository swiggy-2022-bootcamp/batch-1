const User = require("../models/user");
const CryptoJS = require("crypto-js"); //for hashing the passwords

const registerUser = async (req, res) => {

    try {
        // check if the user already exists
        const user = await User.findOne({ email: req.body["username"] });
        if (user) {
            return res.status(409).json({
                message: "User already exists!",
            });
        }

        // create a new user
        const newUser = new User({
            name: req.body["registration-name"],
            email: req.body["username"],
            password: CryptoJS.AES.encrypt(req.body["password"], process.env.CRYPTO_SECURITY_KEY),
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

const loginUser = (req, res) => { };

module.exports = {
    registerUser,
    loginUser,
};
