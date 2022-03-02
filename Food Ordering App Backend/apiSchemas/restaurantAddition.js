const Joi = require('joi');

exports.schema = Joi.object({
    restaurantName : Joi.string().required(),
    restaurantAddress : Joi.string().required()
})