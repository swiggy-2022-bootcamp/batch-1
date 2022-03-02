const Joi = require('joi');

exports.schema = Joi.object({
    username : Joi.string().required(),
    restaurantName : Joi.string().required(),
    restaurantID : Joi.string().required(),
    foodName : Joi.string().required(),
    foodQuantity : Joi.number().min(0).integer().required()
})