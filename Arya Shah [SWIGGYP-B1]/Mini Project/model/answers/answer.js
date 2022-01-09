const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const schema = mongoose.Schema

const answerSchema = new schema({
        questionId:{
             type: mongoose.Types.ObjectId,
        },
        userId: {
            type: mongoose.Types.ObjectId,
        },
        title: {
            type: String,
            required: false
        },
        content: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            default: new Date
        },
        upVote:[{
                userId:{
                    type: mongoose.Types.ObjectId,
                }            
            }],
        downVote:[{
                userId:{
                    type: mongoose.Types.ObjectId,
                }         
            }],
       
})
const answer = mongoose.model('answers', answerSchema);
module.exports = answer;
