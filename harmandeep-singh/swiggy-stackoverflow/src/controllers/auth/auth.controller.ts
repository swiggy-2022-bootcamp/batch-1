import { Request, Response } from 'express';
import { config } from '../../config';
import { saveUser, getUser } from '../../data/auth/auth.data';
import { genAuthToken, isExisitingUser } from '../util';
const bcrypt = require('bcryptjs');


export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(await isExisitingUser(username))) {
        res.status(config.STATUS.UNAUTHORIZED).send({ message: 'sorry invalid credentials' });
    }
    const user = await getUser(username);
    const isVaildPass: boolean = await bcrypt.compare(password, user.password);

    if (!isVaildPass) {
        res.status(config.STATUS.UNAUTHORIZED).send({ message: 'sorry invalid credentials' });
    }
    const token = await genAuthToken(username, user._id);
    res.status(config.STATUS.SUCCESS).send({ "auth-token": token, message: "login successful" });
}


export const register = async (req: Request, res: Response) => {
    const { username, password, registerationName } = req.body;
    if ((await isExisitingUser(username))) {
        res.status(config.STATUS.BAD_REQUEST).send({ message: 'user already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const registeredUser = await saveUser({
        username,
        password: hash,
        registerationName,
    });

    const token = await genAuthToken(username, registeredUser._id);

    const respose = {
        "message": "user registered successfully",
        "registered-name": registeredUser.registerationName,
        "auth-token": token,
    }
    res.status(config.STATUS.CREATED).send(respose);
}