//IMPORT Modules:
const accountAuthRouter = require("express").Router();
const users = require("../data/userAccountsData").userDB;
const accountLoginController = require("../controller/accountLoginController");
const bcrypt = require("bcrypt");
const {
    check,
    validationResult
} = require("express-validator");






//GET Request - Welcome Page:
accountAuthRouter.get("/", (req, res) => {
    res.send("Converge - where meetings made delight!");
})

//POST - Register User:
accountAuthRouter.post('/user', [
    check("name", "Please provide a valid name.").isLength({
        min: 3
    }),
    check("email", "Please provide a valid email.").isEmail(),
    check("password", "Please provide a valid password. ( >3 characters)").isLength({
        min: 3
    })], async (req, res) => {
    //Value Initialization:
    const {
        name,
        email,
        password
    } = req.body;

    //Input Validation:
    const errors = validationResult(req); //Returns an array of errors.
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //Is USER Registered ? - Validation
    let user = users.find((user) => {
        return user.email === email; //returns user as undefined if no matching email is found on the DB
    });
    if (user) { //If user is undefined - return Bad Request Error.
        return res.status(400).json({
            "message": "This user already exists!"
        });
    }

    //Post all validations, execute the below code to register new user.

    //let's hash the user's password, to prevent illegitimate access.
    let hashedPassword = await bcrypt.hash(password, 5);

    users.push({
        name,
        email,
        password: hashedPassword
    });

    res.status(200).json({
        "message": "User Registration Successful!"
    });
});






//GET - Checking all registered users:
accountAuthRouter.get("/allUsers", (req, res) => {
    res.json(users);
});






//POST - Login User:
accountAuthRouter.post('/login', accountLoginController );



//Exporting accountAuthRouter module:
module.exports = accountAuthRouter;