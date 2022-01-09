const User = require('../models/user');
//--- Auth 
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';


exports.addUser = async function (req) {
    const new_id = await User.find().count() + 1;
    const new_user = new User({
        id: new_id,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        address: {
            houseno: req.body.address.houseno,
            street: req.body.address.street,
            city: req.body.address.city,
            state: req.body.address.state,
            zip: req.body.address.zip,
        }
    });
    const a1 = await new_user.save();
    return a1;
}

exports.authenticateUser = async function (req) {
    const username = req.body.userName;
    const password = req.body.password;
    var user = await User.find({ userName: username });
    console.log(username);
    user = user[0];

    if (!user) {
        return
    }
    //if (await bcrypt.compare(String(password), String(user.password))) {
    if (password.localeCompare(user.password) == 0) {
        // the username, password combination is successful
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )
        return (token);
    }
    else
        return
}


exports.getAllUsers = async function (req) {
    const all_users = await User.find();
    return ({
        'userCount': all_users.length,
        'users': all_users
    });
}

exports.getUserById = async function (req) {
    const user = await User.find({ userName: req.params.userID });
    if (user.length !== 0)
        return user;
    else
        return;
}

exports.updateUserDetails = async function (req) {

    const old_data = await User.find({ userName: req.body.userName });
    if (old_data.length !== 0) {
        var user = Array.from(old_data);
        //user.push(...old_data);
        //var user = old_data.slice(0);
        user = user[0];
        if (req.body.userName) user.userName = req.body.userName;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;
        if (req.body.address) {
            if (req.body.address.houseno) user.address.houseno = req.body.address.houseno;
            if (req.body.address.street) user.address.street = req.body.address.street;
            if (req.body.address.city) user.address.city = req.body.address.city;
            if (req.body.address.state) user.address.state = req.body.address.state;
            if (req.body.address.zip) user.address.zip = req.body.address.zip;
        }

        const new_data = await user.save();
        return ({
            //"oldData": old_data,
            "newData": new_data
        });
    }
    else
        return;
}

exports.deleteUser = async function (req) {
    console.log(req.params.id);
    var user = await User.find({ userName: req.params.id });
    if (user.length !== 0) {
        user = user[0];
        const deleted_user = await User.deleteOne(user);
        deleted_user["deletedUser"] = user;
        return deleted_user;
    }
    else
        return
}
