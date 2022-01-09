const handlers = require('../handlers/handler');
const auth = require('../middleware/auth');
const express = require('express');
const api = express.Router();

const answerDelivery = (usecase) => {
    const handler = new handlers(usecase)

    api.post('/v1/answer/submit', auth, (req,res)=>{
        handler.createAnswer(req,res)
    })
    api.get('/v1/answer/:questionId', auth, (req,res)=>{
        handler.viewAnswer(req,res)
    })
    api.put('/v1/answer/vote/:answerId/:userId', auth, (req,res)=>{
        handler.voteAnswer(req,res)
    })
}
module.exports ={
    answerDelivery,
    api
}