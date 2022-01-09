const handlers = require('../handlers/handler');
const auth = require('../middleware/auth');
const express = require('express');
const api = express.Router();

const questionDelivery = (usecase) => {
    const handler = new handlers(usecase)

    api.post('/v1/questions/ask/', auth, (req,res)=>{
        handler.askQuestion(req,res)
    })
    api.get('/v1/questions/view', auth, (req,res)=>{
        handler.viewQuestion(req,res)
    })
    api.put('/v1/questions/vote/:questionId/:userId', auth, (req,res)=>{
        handler.voteQuestion(req,res)
    })
    api.put('v1/questions/answer/:userId/:questionId', auth, (req,res)=>{
        handler.answerQuestion(req,res)
    })
    api.put('/v1/question/subscribe/:questionId/:email', auth, (req, res)=>{
        handler.subscribe(req,res)
    })
}
module.exports ={
    questionDelivery,
    api
}