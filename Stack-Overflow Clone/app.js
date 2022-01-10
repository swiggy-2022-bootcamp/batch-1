const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('./model/user')
const Question = require('./model/question')
import {ObjectId} from "mongodb"
const { JWT_SECRET } = require('./secrets.json')
const { response } = require('express')
const { validate } = require('./model/user')

mongoose.connect('mongodb://localhost:27017/stack_overflow_clone');

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

const PORT = process.env.port || 4000;

app.get('/', (req, res) => {
    res.send('Hello');
})

app.post('/question', async (req, res) => {
    const{email, password} = req.body.user_details;
    const {title, body} = req.body.question;

    const {status, message, user} = await validate();

    if(status != 200){
        return res.status(status).json({message: message});
    }

    try{
        Question.create({
            user: user,
            title: title,
            body: body
        }).then((question_doc) => {
            return res.status(201).json({ status: 'ok', message: 'Question posted Succesfully', question_id: question_doc._id})
        })
        
    } catch(error){
        return res.json({status: 'error', error: error.message});
    }
})

app.post('/answer', async(req, res) => {
    const {email, password} = req.body.user_details;
    const question_id = req.params.question_id;

    const {status, message, user} = await validate();
    if(status != 200){
        return res.status(status).json({message: message});
    }

    const q_id = new ObjectId(question_id);
    const question = await Question.findOne({"_id": q_id});
    if(!question){
        return res.status(404).send({"messsage": "Invalid Question Id"});
    } 
    let answered_already = false;
    const _id = new ObjectId(user._id);
    for(let i in question.answers){
        if((question.answers[i].user).equals(_id)){
            answered_already = true;
            break;
        }
    }

    if(answered_already){
        return res.status(409).json({message: "Already answered the question"});
    }

    try{
        Question.updateOne({id: q_id},{
            $push: {
                answers: {
                    user: user._id,
                    answer: answer
                }
            }
        }).then(() => {
            res.status(201).json({message: "Answer posted succesfully", question_id: question_id});
        })
    } catch(error){
        res.status(500).json({message: error.message});
    }
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
        await User.create({
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
