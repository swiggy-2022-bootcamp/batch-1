const express = require('express');
const app = express.Router();
//--- Functionalities
const Rest_Obj = require('../controllers/restaurant_functions')


// -----------------------------------------------------------------------------------------
// ----------------------------------- END POINTS ------------------------------------------
// -----------------------------------------------------------------------------------------

// ----------------------------------- RESTAURANT END POINTS ------------------------------------
// To Add a Restaurant
app.post('/add', async (req, res) => {
    try {
        const data = await Rest_Obj.addRestaurant(req);
        return res.status(200).json({ status: '200', data: data });
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

// To Get All Restaurant
app.get('/viewall', async (req, res) => {
    try {
        const data = await Rest_Obj.getAllRestaurants(req);
        return res.status(200).json({ status: '200', data: data })
    } catch (err) {
        return res.status(400).json({ status: '400', error: err });
    }
});

//To Filter Restaurants
app.post('/filter', async (req, res) => {
    try {
        const data = await Rest_Obj.queryRestaurants(req);
        if (data)
            return res.status(200).json({ status: '200', data: data });
        else
            return res.status(200).json({ status: '200', error: 'Check the Filters Applied' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ status: '400', error: err });
    }
});



// ----------------------------------------------------------------------------------------------
module.exports = app;
// ----------------------------------------------------------------------------------------------

