const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs");
const config = require("../config"); // get config file

const Restaurant = require("../models/Restaurant");
const Address = require("../models/Address");
const Food = require("../models/Food");
const Order = require("../models/Order");

const restaurantUtils = require("../utils/restaurantUtils");

const createError = require("http-errors");

const getRestaurants = async (req, res, next) => {
    try {
        const result = await Restaurant.find();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
};

const getRestaurantById = async (req, res, next) => {
    try {
        const result = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        result.length > 0
            ? res.send(result[0])
            : res.send("Restaurant does not exist");
    } catch (error) {
        console.log(error.message);
    }
};

const registerNewUser = (req, res) => {
    try {
        const data = req.body;
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const address = new Address({
            houseNo: data.address.houseNo,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
        });
        const cart = new Cart({});
        User.create(
            {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                balance: 0,
                address: address,
                cart: cart,
            },
            function (err, user) {
                if (err) {
                    return res
                        .status(500)
                        .send("There was a problem registering the user`.");
                }

                // if user is registered without errors
                // create a token
                var token = jwt.sign({ id: user.userId }, config.secret, {
                    expiresIn: 86400, // expires in 24 hours
                });

                res.status(200).send({ auth: true, token: token });
            }
        );
    } catch (error) {
        console.log(error.message);
    }
};

const loginRestaurant = (req, res) => {
    Restaurant.findOne({ email: req.body.email }, function (err, restaurant) {
        if (err) {
            return res.status(500).send("Error on the server.");
        }
        if (!restaurant) {
            return res.status(404).send("No Restaurant found.");
        }

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            restaurant.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user.restaurantId }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });
};

const registerRestaurant = async (req, res, next) => {
    try {
        const data = req.body;
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        const address = new Address({
            houseNo: data.address.houseNo,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
        });
        const food = new Food({});
        Restaurant.create(
            {
                name: data.name,
                username: data.username,
                email: data.email,
                password: hashedPassword,
                balance: 0,
                address: address,
                menu: [],
            },
            function (err, restaurant) {
                if (err) {
                    return res
                        .status(500)
                        .send(
                            "There was a problem registering the restaurant."
                        );
                }
                // if user is registered without errors
                // create a token
                var token = jwt.sign(
                    { id: restaurant.restaurantId },
                    config.secret,
                    {
                        expiresIn: 86400, // expires in 24 hours
                    }
                );

                res.status(200).send({ auth: true, token: token });
            }
        );
    } catch (error) {
        console.log(error.message);
    }
};

const modifyRestaurantByIdIfPresent = async (req, res, next) => {
    try {
        const queryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (queryResult.length == 0) {
            res.send("Restaurant does not exist");
        }
        const data = req.body;
        const address = new Address({
            houseNo: data.address.houseNo,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
        });
        const result = await Restaurant.updateOne(
            {
                restaurantId: req.params.restaurantId,
            },
            {
                $set: {
                    name: data.name,
                    username: data.username,
                    password: data.password,
                    address: address,
                },
            }
        );
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
};

const getRestaurantBalance = async (req, res, next) => {
    try {
        const result = await Restaurant.find(
            {
                restaurantId: req.params.restaurantId,
            },
            {
                balance: 1,
                _id: 0,
            }
        );
        result.length > 0
            ? res.send(result[0])
            : res.send("Restaurant does not exist");
    } catch (error) {
        console.log(error.message);
    }
};

const getRestaurantMenu = async (req, res, next) => {
    try {
        const result = await Restaurant.find(
            {
                restaurantId: req.params.restaurantId,
            },
            {
                menu: 1,
                _id: 0,
            }
        );
        result.length > 0
            ? res.send(result[0].menu)
            : res.send("Restaurant does not exist");
    } catch (error) {
        console.log(error.message);
    }
};

const createRestaurantMenu = async (req, res, next) => {
    try {
        const queryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (queryResult.length > 0) {
            res.status(404).send("Restaurant does not exist");
        }
        let menu = queryResult[0].menu;
        let maxFoodId = 0;
        menu.forEach((ele, ind) => {
            maxFoodId = ele.foodId > maxFoodId ? ele.foodId : maxFoodId;
        });
        const food = new Food({
            foodId: maxFoodId + 1,
            foodName: req.body.foodName,
            foodCost: req.body.foodCost,
            foodType: req.body.foodType,
        });
        menu.push(food);
        const result = await Restaurant.updateOne(
            {
                restaurantId: req.params.restaurantId,
            },
            {
                $set: {
                    menu: menu,
                },
            }
        );
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
};

const createRestaurantMenuItem = async (req, res, next) => {
    try {
        const restaurantQueryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (restaurantQueryResult.length == 0) {
            res.send("Restaurant does not exist");
        }
        const result = restaurantQueryResult[0].menu.filter(
            (item) => item.foodId == req.params.foodId
        );
        result.length > 0
            ? res.send(result[0])
            : res.send("Food does not exist");
    } catch (error) {
        console.log(error.message);
    }
};

const getRestaurantOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            restaurantId: req.params.restaurantId,
        });
        res.status(200).send(orders);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getRestaurantOrderbyId = async (req, res, next) => {
    try {
        const order = await Order.findOne({
            orderId: req.params.orderId,
        });
        res.status(200).send(order);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const deleteRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({
            restaurantId: req.params.restaurantId,
        });
        if (!restaurant) {
            throw createError(
                400,
                "Restaurant with id" + req.params.userId + " doesn't exist!!!"
            );
        }
        const result = await Restaurant.deleteOne({
            restaurantId: req.params.restaurantId,
        });
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const deleteFoodFromRestaurantMenu = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findOne({
            restaurantId: req.params.restaurantId,
        });
        if (!restaurant) {
            throw createError(
                400,
                "Restaurant with id" + req.params.userId + " doesn't exist!!!"
            );
        }
        let menu = restaurant.menu;
        let deletedItem, newMenu;
        [deletedItem, newMenu] = restaurantUtils.deleteItemFromArray(
            menu,
            (food) => food.foodId == req.params.foodId
        );
        await Restaurant.updateOne(
            {
                restaurantId: req.params.restaurantId,
            },
            {
                $set: {
                    menu: newMenu,
                },
            }
        );
        res.status(200).send(deletedItem);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    getRestaurants,
    getRestaurantById,
    registerRestaurant,
    loginRestaurant,
    modifyRestaurantByIdIfPresent,
    getRestaurantBalance,
    getRestaurantMenu,
    createRestaurantMenu,
    createRestaurantMenuItem,
    getRestaurantOrders,
    getRestaurantOrderbyId,
    deleteRestaurantById,
    deleteFoodFromRestaurantMenu,
};
