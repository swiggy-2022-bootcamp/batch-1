const express = require('express');
const app = express.Router();
//--- Functionalities
const User_Obj = require('../controllers/user_functions')
const Food_Obj = require('../controllers/food_functions')
//--- Data Models
const User = require('../models/user');
//--- Validation
const User_Val = require('../controllers/user_validation');


// -----------------------------------------------------------------------------------------
// ----------------------------------- END POINTS ------------------------------------------
// -----------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    return res.send('Hello Foody App !');
});

// ----------------------------------- USER END POINTS ------------------------------------------
// To Register a User
app.post('/register', async (req, res) => {
    try {
        const error = await User_Val.validateUserReq(req.body);
        if (error) {
            return res.status(200).json({ status: '200', error: error });
        }
        const data = await User_Obj.addUser(req);
        return res.status(200).json({ status: '200', data: data });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Validate a User
app.post('/authenticate', async (req, res) => {
    try {
        const allow = await User_Obj.authenticateUser(req);
        if (allow)
            return res.status(200).json({ status: '200', data: allow });
        else
            return res.status(403).json({ status: '403', error: 'Invalid username/password' });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Get list of All Registered Users
app.get('/users', async (req, res) => {
    try {
        const data = await User_Obj.getAllUsers(req);
        return res.status(200).json({ status: '200', data: data })
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To get User Details
app.get('/users/:userID', async (req, res) => {
    try {
        const data = await User_Obj.getUserById(req);
        if (data)
            return res.status(200).json({ status: '200', data: data });
        else
            return res.status(200).json({ status: '200', error: `Sorry user with ${req.params.userID} not found.` });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Update
app.put('/users', async (req, res) => {
    //res.send('To Update a User !');
    try {
        const data = await User_Obj.updateUserDetails(req);
        if (data)
            return res.status(200).json({ status: '200', data: data });
        else
            return res.status(200).json({ status: '200', error: `Sorry user with ${req.body.userName} not found.` });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Delete
app.delete('/users/:id', async (req, res) => {
    try {
        const data = await User_Obj.deleteUser(req);
        if (data)
            return res.status(200).json({ status: '200', data: data });
        else
            return res.status(200).json({ status: '200', error: `Sorry user with ${req.params.id} not found.` });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

// ----------------------------------------------------------------------------------------------

// ----------------------------------- FOOD END POINTS ------------------------------------------

//To add a New Food
app.post('/food', async (req, res) => {

    try {
        const data = await Food_Obj.addFood(req);
        return res.status(200).json({ status: '200', data: data });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To get Food Details
app.get('/food/:foodID', async (req, res) => {
    try {
        const data = await Food_Obj.getFoodById(req);
        if (data)
            return res.status(200).json({ status: '200', data: user });
        else
            return res.status(200).json({ status: '200', error: `Sorry Food with ${req.params.userID} not found.` });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Filter Foods
app.post('/food/filter', async (req, res) => {
    try {
        const data = await Food_Obj.queryFood(req);
        if (data)
            return res.status(200).json({ status: '200', data: data });
        else
            return res.status(200).json({ status: '200', error: 'Check the Filters Applied' });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});


// ----------------------------------------------------------------------------------------------
module.exports = app;
// ----------------------------------------------------------------------------------------------

