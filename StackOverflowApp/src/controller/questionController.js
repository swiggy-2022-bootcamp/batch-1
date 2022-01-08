import { validateUser } from "./userController.js"
import userModel from "../models/user.js"
import questionModel from "../models/question.js"
import {ObjectId} from "mongodb"

const addQuestion = async (req,res)=>{
    const userDetails = req.body["user-details"];
    const { question } = req.body
    
    const { status, message } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    const userId = await userModel.findOne({email: userDetails.email})
    console.log(userId);
    question.user = userId._id

    questionModel.create(question)
        .then((questionDocument)=>{
            return res.status(201).send({
                "message" : "Question added successfully",
                "question-id" : questionDocument._id
            })
        })
        .catch(err =>{
            return res.status(500).send({
                message: err.message,
            })
        })

}

const addAnswer = async (req,res)=>{
    const userDetails = req.body["user-details"];
    // console.log(req.params);
    const questionId = req.params.questionId
    const { status, message } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    const { answer } = req.body.question
    console.log(answer, questionId);
    questionModel.findOneAndUpdate({_id: new ObjectId(questionId)}, {
        $push: {
            answer
        }
    }).then(()=>{
        res.status(200).send({
            "message": "answer posted successfully",
            "quesiton-id" : questionId
        })
    }).catch((err)=>{
        console.log()
        res.status(500).send({message: err.message})
    })

}

export { addQuestion, addAnswer }