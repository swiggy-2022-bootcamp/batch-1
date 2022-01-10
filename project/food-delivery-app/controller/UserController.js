const jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const bcrypt = require("bcryptjs");
const config = require("../config"); // get config file

const createError = require("http-errors");

const User = require("../models/User");
const Address = require("../models/Address");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const userUtils = require("../utils/userUtils");
const restaurantUtils = require("../utils/restaurantUtils");
const companyUtils = require("../utils/companyUtils");

const getUsers = async (req, res, next) => {
    try {
        const result = await User.find();
        res.send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const getuserById = async (req, res, next) => {
    try {
        const result = await User.find(
            {
                userId: req.params.userId,
            },
            {
                userId: 1,
                username: 1,
                email: 1,
                address: 1,
                balance: 1,
                cart: 1,
                _id: 0,
            }
        );
        if (result.length == 0) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }
        res.status(200).send(result[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const modifyUserByIdIfPresent = async (req, res, next) => {
    try {
        const queryResult = await User.find({ userId: req.params.userId });
        if (queryResult.length == 0) {
            if (queryResult.length == 0) {
                throw createError(
                    404,
                    "User with id " + req.params.userId + " does not exist!!!"
                );
            }
        }
        const data = req.body;
        const address = new Address({
            houseNo: data.address.houseNo,
            street: data.address.street,
            city: data.address.city,
            state: data.address.state,
            zip: data.address.zip,
        });
        const result = await User.updateOne(
            {
                userId: req.params.userId,
            },
            {
                $set: {
                    username: data.username,
                    password: data.password,
                    balance: 0,
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
                        .send("There was a problem registering the user.");
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
        next(error);
    }
};

const loginUser = (req, res) => {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            return res.status(500).send("Error on the server.");
        }
        if (!user) {
            return res.status(404).send("No user found.");
        }

        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400, // expires in 24 hours
        });

        // return the information including token as JSON
        res.status(200).send({ auth: true, token: token });
    });
};

const getUserBalance = async (req, res, next) => {
    try {
        const result = await User.find(
            {
                userId: req.params.userId,
            },
            {
                balance: 1,
                _id: 0,
            }
        );
        if (result.length == 0) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }
        res.status(200).send(result[0]);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const modifyUserBalance = async (req, res, next) => {
    try {
        const queryResult = await User.find({ userId: req.params.userId });
        if (queryResult.length == 0) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }
        const currentBalance = queryResult[0].balance;
        const newBalance = currentBalance + req.body.balance;
        const result = await User.updateOne(
            {
                userId: req.params.userId,
            },
            {
                $set: {
                    balance: newBalance,
                },
            }
        );
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const fetchUserCart = async (req, res, next) => {
    try {
        const result = await User.find(
            {
                userId: req.params.userId,
            },
            {
                cart: 1,
                _id: 0,
            }
        );
        if (result.length == 0) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }
        res.status(200).send(result[0].cart);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const modifyUserCart = async (req, res, next) => {
    try {
        const queryResult = await User.find({ userId: req.params.userId });
        if (queryResult.length == 0) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }
        let cart = new Cart({});
        const restaurants = await restaurantUtils.getRestaurant(
            req.body.restaurantId
        );
        if (restaurants.length == 0) {
            throw createError(
                400,
                "Restaurant with id " +
                    req.body.restaurantId +
                    " does not exist!!!"
            );
        }
        cart.restaurantId = req.body.restaurantId;
        cart.foodList = [];
        const menuIdList = new Set(
            await restaurantUtils.getFoodIdList(req.body.restaurantId)
        );
        const reqFoodList = req.body.foodList;
        console.log(menuIdList);
        reqFoodList.forEach((element) => {
            console.log(element.foodId);
            if (menuIdList.has(element.foodId)) {
                cart.foodList.push({
                    foodId: element.foodId,
                    quantity: element.quantity,
                });
            } else {
                throw createError(
                    400,
                    "Invalid Food Id " + element.foodId + "!!!"
                );
            }
        });
        const result = await User.updateOne(
            {
                userId: req.params.userId,
            },
            {
                $set: {
                    cart: cart,
                },
            }
        );
        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const userCheckout = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            throw createError(
                404,
                "User with id " + req.params.userId + " does not exist!!!"
            );
        }

        if (!Object.keys(user.cart).length) {
            throw createError(400, "Cart is empty!!!");
        }
        const restaurants = await restaurantUtils.getRestaurant(
            user.cart.restaurantId
        );
        if (restaurants.length == 0) {
            throw createError(
                400,
                "Restaurant with id " +
                    req.body.restaurantId +
                    " does not exist!!!"
            );
        }

        const restaurantMenu = restaurants[0].menu;
        let priceMap = {};
        restaurantMenu.forEach((food) => {
            priceMap[food.foodId] = food.foodCost;
        });

        const cartFoodList = user.cart.foodList;

        let amount = 0;
        cartFoodList.forEach((cartItem) => {
            amount += cartItem.quantity * priceMap[cartItem.foodId];
        });

        if (user.balance < amount) {
            throw createError(400, "Insufficient Balance!!!");
        }
        const order = new Order({
            userID: user.userId,
            restaurantId: user.cart.restaurantId,
            foodList: user.cart.foodList,
            amount: amount,
        });
        const result = await order.save();

        await userUtils.updateBalance(user.userId, -1 * amount);
        await companyUtils.updateBalance(amount * 0.25);
        await restaurantUtils.updateBalance(
            user.cart.restaurantId,
            amount * 0.75
        );

        const emptyCart = new Cart({});

        await User.updateOne(
            {
                userId: user.userId,
            },
            {
                $set: {
                    cart: emptyCart,
                },
            }
        );

        res.status(200).send(result);
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (user) {
            const result = await User.deleteOne({ userId: req.params.userId });
            res.status(200).send(result);
        } else {
            throw createError(
                400,
                "User with id" + req.params.userId + " doesn't exist!!!"
            );
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = {
    getUsers,
    getuserById,
    modifyUserByIdIfPresent,
    registerNewUser,
    loginUser,
    getUserBalance,
    modifyUserBalance,
    fetchUserCart,
    modifyUserCart,
    userCheckout,
    deleteUserById,
};
