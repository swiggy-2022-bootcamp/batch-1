const Joi = require('joi');

exports.schema = Joi.object({
    _id : Joi.string().alphanum().required(),
    username : Joi.string().alphanum(),
    email : Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password : Joi.string().min(6),
    address : Joi.object({
        houseno : Joi.string(),
        street : Joi.string(),
        city : Joi.string(),
        state : Joi.string(),
        zip : Joi.string().length(6).regex(/^\d+$/)
    })
})