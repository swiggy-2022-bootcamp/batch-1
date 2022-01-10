import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
//import { JWT_SECRET } from '../secrets.json'

import { readFile } from 'fs/promises';
const {JWT_SECRET} = JSON.parse(await readFile(new URL('../secrets.json', import.meta.url)));

const registerController = async(req, res) => {
    const { name, email, password: plainTextPassword } = req.body;
    console.log(req.body);
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        await User.create({
            name,
            email, 
            password
        });
        console.log('User created Succesfully');
    } catch (error){
        if(error.code === 11000){
            return res.status(409).json({error: 'Email already registered' });
        }
        return res.status(500).json({error: error.message});
    }
    
    return res.status(201).json({message: 'User registered Succesfully', registration_name: name});
}

const loginController = async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean();

    if(!user){
        return res.status(404).json({message: 'Sorry, invalid credentials'});
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            },
            JWT_SECRET
        )
        return res.status(200).json({message: 'User logged in succesfully', data: token})
    }

    return res.status(401).json({error: 'Sorry, invalid credentials'});
}

const changePasswordController = async(req, res) => {
    const {token, new_password} = req.body;

    try{
        const user = jwt.verify(token, JWT_SECRET);
        const _id = user.id
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await User.updateOne(
            {_id},
            {
                $set: {password:  hashedPassword}
            }
        )
        res.status(200).json({message: 'Password succesfully changed'});
    } catch(error) {
        res.json({error: error.message});
    }
}

export {registerController, loginController, changePasswordController};