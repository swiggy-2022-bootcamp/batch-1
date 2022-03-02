const Restaurant = require('../schemas/restaurant.js')
const restaurantAdditionValidation = require('../apiSchemas/restaurantAddition.js');


async function saveRestaurantDetails(req) {

    try {
        const restaurant = await Restaurant.create({
            restaurantName : req.body.restaurantName,
            restaurantAddress : req.body.restaurantAddress
        });

        await restaurant.save();
        return restaurant;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

exports.addRestaurantDetails = async (req, res) => {

    try {
        await restaurantAdditionValidation.schema.validateAsync(req.body);
    } catch(e) {
        return res.status(422).json({"message" : e.details[0].message});
    }



    try {
    
        const oldRestaurant = await Restaurant.findOne({ restaurantAddress : req.body.restaurantAddress });
        if (oldRestaurant) {
            return res.status(409).send("Restaurant already registered");
        }   
    } catch(e) {
        console.log(e.message);
        return;
    }

    const restaurantSaved = await saveRestaurantDetails(req);

    if(restaurantSaved) {
    return res.status(200).send(restaurantSaved);   
    }

    res.status(400).send("Restaurant registration not successful");
}

exports.restaurantDetails = async (req, res) => {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
}