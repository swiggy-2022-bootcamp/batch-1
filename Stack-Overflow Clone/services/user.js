import bcrypt from "bcryptjs";
import User from '../model/user.js'

async function validate(user_details){
    const {email, password} = user_details;
    const existing_user = await User.findOne({email}).lean();

    const res = {status: null, message: "", user: ""}

    if(!existing_user){
        res.status = 404;
        res.message = 'Sorry, invalid credentials';
    } else if(await bcrypt.compare(password, existing_user.password)){
        res.status = 200;
        res.message = 'User logged in succesfully';
        res.user = existing_user._id;
    } else{
        res.status = 401;
        res.message = 'Sorry, invalid credentials';
    }
    console.log(res);
    return res;
}

export { validate };