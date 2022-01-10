const Food = require('../models/food');

//Utility function to get Food
async function getFood(req, res, next){
    let food;
    try{
        food = await Food.findById(req.params.id);

        if(food == null){
            return res.status(404).json({message: "Food not found"});
        }
    }
    catch(error){
        return res.status(500).json({message:"Not found"});
    }
    res.food = food;
    next();
}

module.exports ={
    getFood
}