const Joi = require('joi');

exports.schema = Joi.object({
    restaurantName : Joi.string().required(),
    restaurantId : Joi.string().required(),
    foodName : Joi.string().required(),
    foodCost : Joi.string().regex(/^\d+$/).required(),
    foodType : Joi.string().required()
})