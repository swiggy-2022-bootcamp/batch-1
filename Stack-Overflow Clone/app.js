const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./model/user')
const { JWT_SECRET } = require('./secrets.json')

mongoose.connect('mongodb://localhost:27017/stack_overflow_clone');

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

const PORT = process.env.port || 4000;

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/change-password', async (req, res) => {
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
        res.json({status: 'ok', message: 'Password succesfully changed'});
    } catch(error) {
        res.json({status: 'error', error: error.message});
    }

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email}).lean();

    if(!user){
        return res.json({ status: 'error', message: 'Sorry, invalid credentials'});
    }

    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({
                id: user._id,
                name: user.name,
                email: user.email
            },
            JWT_SECRET
        )
        return res.json({ status: 'ok', message: 'User logged in succesfully', data: token})
    }

    return res.json({ status: 'error', error: 'Sorry, invalid credentials'});
})

app.post('/register', async (req, res) => {
    const { name, email, password: plainTextPassword } = req.body;
    const password = await bcrypt.hash(plainTextPassword, 10);
    try {
        const response = await User.create({
            name,
            email, 
            password
        });
        console.log('User created Succesfully');
    } catch (error){
        if(error.code === 11000){
            return res.json({ status: 'error', error: 'Email already registered' });
        }
        return res.json({status: 'error', error: error.message});
    }
    
    return res.json({message: 'User registered Succesfully', registration_name: name});

})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
