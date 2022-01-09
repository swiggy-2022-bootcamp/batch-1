import { Request, Response } from 'express';
import { Schema } from 'joi';
import { config } from '../../config';


export const validate = (req: Request, res: Response, schema: Schema) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(config.STATUS.BAD_REQUEST).send({
            message: error.details[0].message,
        });
    }
}