const Joi = require('joi');

exports.schema = Joi.object({
    username : Joi.string().alphanum().required(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password : Joi.string().min(6).required(),
    address : Joi.object({
        houseno : Joi.string().required(),
        street : Joi.string().required(),
        city : Joi.string().required(),
        state : Joi.string().required(),
        zip : Joi.string().length(6).regex(/^\d+$/)
    })
})

