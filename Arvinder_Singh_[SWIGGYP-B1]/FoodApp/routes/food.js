const router               = require('express').Router();
const foodController       = require('../app/controllers/foodController');
const adminAuthMiddleware  = require('../app/middlewares/adminAuthMiddleware')

router.get('/', foodController().getAllFood);
router.get('/:foodId', foodController().getFoodById);  //defualt
router.post('/', adminAuthMiddleware,foodController().addFood); //default
router.delete('/:foodId',adminAuthMiddleware,foodController().deletefood);
router.put('/', adminAuthMiddleware, foodController().updatefood);

module.exports = router;