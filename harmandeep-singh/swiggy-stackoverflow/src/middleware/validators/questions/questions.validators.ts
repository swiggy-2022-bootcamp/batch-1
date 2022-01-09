import { Request, Response, NextFunction } from 'express';
import { validate } from '..';
import { questionSchema, answerSchema } from './questions.schema';

export const validateQuestion = async (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, questionSchema);
    return next();
}

export const validateAnswer = (req: Request, res: Response, next: Function) => {
    validate(req, res, answerSchema);
    next();
}