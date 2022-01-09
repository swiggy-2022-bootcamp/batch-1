import { Request, Response, NextFunction } from "express";
import { config } from "../../config";
const jwt = require("jsonwebtoken");


const isAuthenticated = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(config.STATUS.UNAUTHORIZED).send({ message: "Unauthorized" });
    }

    if (!authorization.startsWith("Bearer")) {
        return res.status(config.STATUS.UNAUTHORIZED).send({ message: "Unauthorized" });
    }

    const split = authorization.split("Bearer ");
    if (split.length !== 2)
        return res.status(config.STATUS.UNAUTHORIZED).send({ message: "Unauthorized" });

    const token = split[1];

    try {
        const decodedToken = await jwt.verify(token, config.JWT_SECRET);
        res.locals = {
            ...res.locals,
            id: decodedToken.id,
            username: decodedToken.username,
        };
        return next();
    } catch (e) {
        return res.status(config.STATUS.UNAUTHORIZED).send({ message: "Unauthenticated" });
    }
};

export default isAuthenticated;