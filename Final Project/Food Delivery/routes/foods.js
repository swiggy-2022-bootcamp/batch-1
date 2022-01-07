const Food = require('../models/food');
const express = require('express');
const router = express.Router();

//GET ALL FOODS
//API GET /api/food
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.send(foods);
    } catch (error) {
        res.status(404).json({message: 'No foods not found'});
    }
});




//GET ONE USER
//API GET /api/users/:id
router.get("/:id", getFood , async (req, res) => {
    if(res.food != null){
        res.status(200).json(res.food);
    }
    else{
        res.status(404).json({message: `Food with ${req.params.id} not found`});
    }
});



//ADD FOOD
//API POST /api/food
router.post('/', async (req, res) => {

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




//DELETE FOOD
//API POST /api/food
router.delete('/:id', getFood, async (req, res) =>{
    try{
        await res.food.remove();
        res.json({message:`Food with ${req.params.id} deleted successfully`})
    }
    catch(error) {
        res.status(404).json({message: `Sorry user with ${req.params.id} not found`});
    }
});



//UPDATE FOODS
//API POST /api/food/:id
router.put('/:id', getFood, async (req, res) => {

    res.food.foodId= req.body.foodId;
    res.food.foodName = req.body.foodName;
    res.food.foodCost= req.body.foodCost;
    res.food.foodType= req.body.foodType;

    try{
        const updatedFood = await res.food.save();
        res.status(200).json(updatedFood);
    }
    catch(error) {
        res.status(404).json({message: `Sorry food with ${req.params.id} not found`});
    }
});




//PATCH FOOD (UPDATE ANY SINGLE ENTITY)
//API POST /api/food/:id
router.patch('/:id', getFood, async (req, res) => {
    if(req.body.foodId != null){
        res.food.foodId= req.body.foodId;
    }
    else if(req.body.foodName != null){
        res.food.foodName = req.body.foodName;
    }
    else if(req.body.foodCost != null){
        res.food.foodCost= req.body.foodCost;
    }
    else if(req.body.foodType != null){
        res.food.foodType= req.body.foodType;
    }
    try{
        const updatedFood = await res.food.save();
        res.status(200).json(updatedFood);
    }
    catch(error) {
        res.status(404).json({message: `Sorry food with ${req.params.id} not found`});
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