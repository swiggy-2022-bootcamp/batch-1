import { config } from "../../config";
import { getUser } from "../../data/auth/auth.data";
const jwt = require('jsonwebtoken');

export const isExisitingUser = async (username: string): Promise<boolean> => {
    const user = await getUser(username);
    return true ? user : false;
}

export const genAuthToken = async (username: string, id: string): Promise<string> => {
    return await jwt.sign({ username, id }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY });
}