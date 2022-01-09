import User from '../../models/user.model';

type UserType = {
    username: string,
    password: string,
    registerationName: string,
}

export const saveUser = async (user: UserType): Promise<any> => {
    const newUser = await User.create(user);
    return newUser;
}

export const getUser = async (username: string): Promise<any> => {
    return await User.findOne({ username });
}