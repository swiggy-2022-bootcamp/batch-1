import Joi, { Schema } from "joi";

export const loginSchema: Schema = Joi.object().keys({
    "username": Joi.string().email().required(),
    "password": Joi.string().required(),
});

export const registerSchema = Joi.object().keys({
    "registerationName": Joi.string().required(),
    "username": Joi.string().email().required(),
    "password": Joi.string().required(),
});