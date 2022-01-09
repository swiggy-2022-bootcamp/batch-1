const Food = require('../schemas/food.js');
const Cart = require('../schemas/cart.js');

const cartModificationValidation = require('../apiSchemas/cartModification.js');

async function saveCartItemDetails(req) {

    try {
        const cartItem = await Cart.create({
            userName : req.body.username,
            userID : req.params.userID,
            restaurantName : req.body.restaurantName,
            restaurantID : req.body.restaurantID,
            foodName : req.body.foodName,

            foodQuantity : parseInt(req.body.foodQuantity)
        });

        await cartItem.save();
        return cartItem;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

exports.modifyCart = async(req, res) => {

    try {
        await cartModificationValidation.schema.validateAsync(req.body);
    } catch(e) {
        return res.status(422).json({"message" : e.details[0].message});
    }


    try {     
        await Cart.deleteOne({userID : req.params.userID, foodName : req.body.foodName, restaurantID : req.body.restaurantID});
    } catch(e) {
        console.log(e.message);
        return res.status(409).json({"message" : "Restaurant not found"});
    }

    const foodItem = await Food.findOne({restaurantId : req.body.restaurantID, foodName : req.body.foodName });

    if(!foodItem) {
        return res.status(409).json({"message" : "Invalid food item"});
    }

    const cartItemSaved = await saveCartItemDetails(req);

    if(cartItemSaved) {
        return res.status(200).send(cartItemSaved);   
    }

    res.status(400).json({"message" : "Cannot add cartItem"});

}

exports.cartDetails = async(req, res) => {

    try {
    
        const cartItems = await Cart.find({userID : req.params.userID});
        
        if(cartItems.length === 0) {
            return res.status(200).json({"message" : "Cart is empty"});
        }

        return res.status(200).json(cartItems);

    } catch(e) {

        res.send(500).json({"message" : "Cannot fetch cart for given user"});
    }

}