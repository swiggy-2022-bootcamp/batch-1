import Joi, { Schema } from "joi";

export const questionSchema: Schema = Joi.object().keys({
    "title": Joi.string().required(),
    "body": Joi.string().required(),
});

export const answerSchema = Joi.object().keys({
    "answer": Joi.string().required(),
});