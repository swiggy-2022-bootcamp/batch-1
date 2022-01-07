const Food = require('../models/food');
const express = require('express');
const router = express.Router();

//GET FOODS
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.send(foods);
    } catch (error) {
        res.status(404).json({message: 'No foods not found'});
    }
})

//GET ONE USER
router.get("/:id", getFood , async (req, res) => {
    if(res.food != null){
        res.status(200).json(res.food);
    }
    else{
        res.status(404).json({message: `Food with ${req.params.id} not found`});
    }
})

//ADD USER
router.post('/food', async (req, res) => {

   const food= new Food({
       foodId: req.body.foodId,
       foodName: req.body.foodName,
       foodCost: req.body.foodCost,
       foodType: req.body.foodType
   });

   try {
       const newFoodItem = await food.save();
       res.status(200).json(newFoodItem);
   }
   catch(error) {
       res.status(400).json({message: error.message})
   }
   
});

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


module.exports = router;