const restaurantModel = require('../models/restaurauntModel');

module.exports.registerRestaurant = async function registerRestaurant(req,res)
{
    try{
        let dataObj = req.body;
        dataObj.restaurantId = req.id;
        let restaurant = await restaurantModel.create(dataObj);

        if(restaurant)
        {
            res.json({
                message:'restaurant has successfully signed up',
                data : restaurant
            });
        }
        else
        {
            res.json({
                message:'error while signing up'
            });
        }
    }
    catch(err)
    {
        res.status(500).json({
            message:err.message
        });
    }
};