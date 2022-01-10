import bcrypt from "bcryptjs";
import User from '../model/user.js'

async function validate(user_details){
    const {email, password} = user_details;
    const user = await User.findOne({email}).lean();

    if(!user){
        return res.json({ status: 404, message: 'Sorry, invalid credentials'});
    }

    if(await bcrypt.compare(password, user.password)){
        return res.json({ status: 200, message: 'User logged in succesfully', _id: user._id})
    }

    return res.json({ status: 401, error: 'Sorry, invalid credentials'});
}

export { validate };