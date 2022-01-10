import bcrypt from "bcrypt";

async function validate(user){
    const {email, password} = user;
    const user = await User.findOne({email}).lean();

    if(!user){
        return res.json({ status: 'error', message: 'Sorry, invalid credentials'});
    }

    if(await bcrypt.compare(password, user.password)){

        return res.json({ status: 'ok', message: 'User logged in succesfully', data: token})
    }

    return res.json({ status: 'error', error: 'Sorry, invalid credentials'});
}

export { validate };