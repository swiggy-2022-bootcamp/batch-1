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

    const currUser = await userModel.findOne({email: userDetails.email})
    question.user = currUser._id

    
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
    const questionId = req.params.questionId
    const { status, message } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    const { answer } = req.body.question
    const currUser = await userModel.findOne({email: userDetails.email})
    const userId = currUser._id

    const question_id = new ObjectId(questionId)
    const doesQuestionExists = await questionModel.findOne({"_id" : question_id})
    
    if(!doesQuestionExists){
        return res.status(400).send({"message" : "Question doesn't exists"})
    }

    questionModel.updateOne({_id: question_id}, {
        $push: {
            answers : {
                user : userId,
                answer : answer
            }
        }
    }).then(()=>{
        res.status(201).send({
            "message": "Answer posted successfully",
            "quesiton-id" : questionId
        })
    }).catch((err)=>{
        console.log()
        res.status(500).send({message: err.message})
    })

}

export { addQuestion, addAnswer }