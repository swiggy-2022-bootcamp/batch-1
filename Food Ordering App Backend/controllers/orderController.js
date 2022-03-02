const Cart = require('../schemas/cart.js');
const Order = require('../schemas/order.js');

async function saveOrderDetails(req, cartItems) {

    try {

        await Cart.deleteMany({userID : req.params.userID});

        const order = await Order.create({
            userName : req.body.username,
            userID : req.params.userID,
            items : cartItems
        });

        await order.save();
        return order;
    
    } catch(e) {
        console.log(e.message);
        return false;
    }
}

exports.addOrder = async(req, res) => {

    const cartItems = await Cart.find({userID : req.params.userID});

    if(cartItems.length === 0)
        return res.status(409).json({"message" : "Cart is empty"});

    const order = await saveOrderDetails(req, cartItems);

    if(order)
    return res.status(200).json(order);

    res.status(500).json({"message" : "Transaction Failed"});
}

exports.orderDetails = async(req, res) => {

    const orders = await Order.find({userID : req.params.userID});

    if(orders.length !== 0)
    return res.status(200).json(orders);

    res.status(200).json({"message" : "No orders for given user"});
}