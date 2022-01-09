import { Request, Response, NextFunction } from 'express';
import { validate } from '..';
import { loginSchema, registerSchema } from './auth.schema';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, loginSchema);
    return next();
}

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    validate(req, res, registerSchema);
    return next();
}