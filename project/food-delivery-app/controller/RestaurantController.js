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
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getRestaurantById = async (req, res, next) => {
    try {
        const result = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (result.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
        }
        res.status(200).send(result[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
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
        var token = jwt.sign({ id: restaurant.restaurantId }, config.secret, {
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
        next(error);
    }
};

const modifyRestaurantByIdIfPresent = async (req, res, next) => {
    try {
        const queryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (queryResult.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
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
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
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
        if (result.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
        }
        res.status(200).send(result[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
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
        if (result.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
        }
        res.status(200).send(result[0].menu);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const createRestaurantMenu = async (req, res, next) => {
    try {
        const queryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (queryResult.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
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
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getRestaurantMenuItem = async (req, res, next) => {
    try {
        const restaurantQueryResult = await Restaurant.find({
            restaurantId: req.params.restaurantId,
        });
        if (restaurantQueryResult.length == 0) {
            throw createError(
                404,
                "Restaurant with id " +
                    req.params.restaurantId +
                    " does not exist!!!"
            );
        }
        const result = restaurantQueryResult[0].menu.filter(
            (item) => item.foodId == req.params.foodId
        );
        if (result.length == 0) {
            throw createError(
                404,
                "Food with id " + req.params.foodId + " does not exist!!!"
            );
        }
        res.status(200).send(result[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
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
        if (!order) {
            throw createError(
                404,
                "Order with id " + req.params.orderId + " does not exist!!!"
            );
        }
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
    getRestaurantMenuItem,
    getRestaurantOrders,
    getRestaurantOrderbyId,
    deleteRestaurantById,
    deleteFoodFromRestaurantMenu,
};
