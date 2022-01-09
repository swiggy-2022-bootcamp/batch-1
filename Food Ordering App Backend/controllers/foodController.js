const Restaurant = require('../schemas/restaurant.js');
const Food = require('../schemas/food.js');

async function saveFoodDetails(req) {

    try {
        const food = await Food.create({
            restaurantName : req.body.restaurantName,
            restaurantId : req.body.restaurantId,
            foodName : req.body.foodName,
            foodCost : parseInt(req.body.foodCost),
            foodType : req.body.foodType
        });

        await food.save();
        return food;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

exports.addFoodDetails =  async (req, res) => {
    try {

        const restaurant = await Restaurant.find({_id : req.body.restaurantId});
        console.log(restaurant);
     
        const oldFood = await Food.findOne({restaurantId : req.body.restaurantId, foodName : req.body.foodName});
        if (oldFood) {
            return res.status(409).send({"message" : "Food Name already exists for this restaurant"});
        }   
    } catch(e) {
        console.log(e.message);
        return res.status(409).json({"message" : "Restaurant not found"});
    }

    const foodSaved = await saveFoodDetails(req);

    if(foodSaved) {
        return res.status(200).send(foodSaved);   
    }

    res.status(400).json({"message" : "Food item registration not successful"});
}

exports.allFoodList = async (req, res) => {
    const food = await Food.find();
    return res.status(200).json(food);
}

exports.foodDetails = async (req, res) => {
    try {
        const food = await Food.find({_id : req.params.foodID});
        return res.status(200).json(food);
    } catch(e) {
        return res.status(404).json({"message" : `Food with id ${req.params.foodID} not found`});
    }
}