import { validateUser } from "./userController.js"
import userModel from "../models/user.js"
import questionModel from "../models/question.js"
import {ObjectId} from "mongodb"

const addQuestion = async (req,res)=>{
    const userDetails = req.body["user-details"];
    const { question } = req.body
    
    const { status, message, _id } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    
    question.user = _id

    
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

    //Validating if the user credentials are correct
    const { status, message, _id } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    const { answer } = req.body.question
    const userId = _id

    //Validating if the question exists or not
    const question_id = new ObjectId(questionId)
    const doesQuestionExists = await questionModel.findOne({"_id" : question_id})
    if(!doesQuestionExists){
        return res.status(404).send({"message" : "Question doesn't exists"})
    }



    // Checking if the current user has already answered the question
    let userAlreadyAnswered = false
    for(let i in doesQuestionExists.answers){
        console.log(doesQuestionExists.answers[i].user + " " + _id)
        if((doesQuestionExists.answers[i].user).equals(_id)) {
            userAlreadyAnswered = true
            break;
        }    
    }

    if(userAlreadyAnswered){
        return res.status(409).send("Yoiu have already answered the question")
    }

    //Adding the answer to the database.
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


const getAnswersByQuestionId = async (req,res)=>{
    const userDetails = req.body["user-details"];
    const questionId = req.params.questionId

    //Validating if the user credentials are correct
    const { status, message, _id } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    //Validating if the question exists or not
    const question_id = new ObjectId(questionId)
    const doesQuestionExists = await questionModel.findOne({"_id" : question_id})
    if(!doesQuestionExists){
        return res.status(404).send({"message" : "Question doesn't exists"})
    }

    let response = {
        question : doesQuestionExists.title,
        answers : []
    }

    for(let i in doesQuestionExists.answers){
       response.answers.push({"answer " : doesQuestionExists.answers[i].answer})
    }

    res.status(200).send(response)
}
export { addQuestion, addAnswer, getAnswersByQuestionId }