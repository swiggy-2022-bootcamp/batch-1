const { addNewFood, getFoodByID } = require('../controller/food.controller');

const router = require('express').Router();





router.post('/',addNewFood);
router.get('/:foodID',getFoodByID);



module.exports = router;