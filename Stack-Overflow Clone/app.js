const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./model/user')

mongoose.connect('mongodb://localhost:27017/stack_overflow_clone');

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

PORT = process.env.port || 4000;

app.get('/', (req, res) => {
    res.send('Hello');
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
