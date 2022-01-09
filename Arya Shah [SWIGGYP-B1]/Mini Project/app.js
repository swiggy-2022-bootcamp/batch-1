const express = require('express');
const db = require('./config/db/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const users =require('./pkg/user');
const question = require('./pkg/questions');
const answers = require('./pkg/answers');

//intialize db
db.connectMongodb();

//connect tools and middlewares
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());



//connect services
app.use(users.userService)
app.use(question.questionService)
app.use(answers.answerService)

//start app
app.listen(process.env.PORT || 8000, ()=>{
    console.log('Server Running on Port 8000...')
})