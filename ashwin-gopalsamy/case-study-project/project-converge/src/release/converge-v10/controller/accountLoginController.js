const bcrypt = require("bcrypt");
const users = require("../data/userAccountsData").userDB;
const jwt = require("jsonwebtoken");
//const loggedInUser = require("../data/userAccountsData").loggedInUser;
const fs = require('fs');

module.exports = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    let user = users.find((user) => {
        return user.email === email
    });

    if (!user) {
        return res.status(401).json({
            "message": "Invalid Credentials"
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({
            "message": "Invalid Password"
        });
    };

    const token = await jwt.sign({
        email
    }, "141fqj1rqfjm1ng10f1rtqwv", {
        expiresIn: 3600
    });

    const activeUser = [
        {
            "activeUser":email
        }
    ]

    res.json({
        "JWT Token": token
    });

    const activeUserID = email;

    module.exports = { activeUserID }
}