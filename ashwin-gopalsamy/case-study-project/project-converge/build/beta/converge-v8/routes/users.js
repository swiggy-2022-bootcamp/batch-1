const express = require('express');
const router = express.Router();
const users = require('../data').userDB;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({
    extended: true
}));
//GET handler
router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/', (req, res) => {
    res.render('register');
})

//POST Handler
// router.post('/', (req, res) => {

//     res.json({
//         "message": "User Registered Successfully"


//     })
// })

router.post('/user', (req, res) => {
    try {
        let foundUser = users.find((data) => req.body.email === data.email);
        if (!foundUser) {
            let hashPassword = bcrypt.hash(req.body.password, 10, function (err, hash) {
                if (err) {
                    return err;
                }
                req.body.password = hash;

            });
            let newUser = {
                id: Date.now(),
                username: req.body.name,
                email: req.body.email,
                password: hashPassword,
            };
            users.push(newUser);
            console.log('User list', users);

            res.send("<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>");
        } else {
            res.send("<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>");
        }
    } catch {
        res.send("Internal server error");
    }
});

router.post('/login', (req, res, next) => {})

//LOGOUT Handler
router.get('/logout', (req, res) => {})
module.exports = router;