const express = require('express');
const router = express.Router();
const {getFood} = require('../utility/getFood')
const {getAllFood, getFoodById, addFood, deleteFoodById, updateFoodById, patchFoodById} = require('../controllers/foodController');

//GET ALL FOODS
//API GET /api/food
router.get('/', getAllFood);




//GET ONE USER
//API GET /api/users/:id
router.get("/:id", getFood , getFoodById);



//ADD FOOD
//API POST /api/food
router.post('/', addFood);




//DELETE FOOD
//API POST /api/food
router.delete('/:id', getFood, deleteFoodById);



//UPDATE FOODS
//API POST /api/food/:id
router.put('/:id', getFood, updateFoodById);




//PATCH FOOD (UPDATE ANY SINGLE ENTITY)
//API POST /api/food/:id
router.patch('/:id', getFood, patchFoodById);



module.exports = router;