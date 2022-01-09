import { validateUser } from "./userController.js"
import userModel from "../models/user.js"
import questionModel from "../models/question.js"
import {ObjectId} from "mongodb"
import { logger } from "../utils/logger.js"

const addQuestion = async (req,res)=>{
    const userDetails = req.body["user-details"];
    const { question } = req.body
    
    const { status, message, _id } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    //Validating if user is authorized
    const { _status, _message } = await checkIfUserIsAuthorized(req.user._id, _id)
    if(_status != 200){
        return res.status(_status).send({ "message" : _message })
    }
    
    question.user = _id

    
    questionModel.create(question)
        .then((questionDocument)=>{
            logger.info("POST question returned 201 CREATED. ")
            return res.status(201).send({
                "message" : "Question added successfully",
                "question-id" : questionDocument._id
            })
        })
        .catch(err =>{
            logger.error(`Add question POST request failed with ${err.message}`)
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

    //Validating if user is authorized
    const { _status, _message } = await checkIfUserIsAuthorized(req.user._id, _id)
    if(_status != 200){
        return res.status(_status).send({ "message" : _message})
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
        return res.status(409).send("You have already answered the question")
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
        logger.info("POST request for add answers returned 201 CREATED.")
        res.status(201).send({
            "message": "Answer posted successfully",
            "quesiton-id" : questionId
        })
    }).catch((err)=>{
        logger.error(`Add answer POST request failed with  ${err.message}`)
        res.status(500).send({message: err.message})
    })

}

const updateAnswer = async (req,res) => {
    const userDetails = req.body["user-details"];
    const questionId = req.params.questionId

    //Validating if the user credentials are correct
    const { status, message, _id } = await validateUser(userDetails)
    if(status != 200){
        return res.status(status).send({message})
    }

    //Validating if user is authorized
    const { _status, _message } = await checkIfUserIsAuthorized(req.user._id, _id)
    if(_status != 200){
        return res.status(_status).send({ "message" : _message})
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
    let existingResponse = ""
    let updatedAnnswers = []
    for(let i in doesQuestionExists.answers){
        if((doesQuestionExists.answers[i].user).equals(_id)) {
            userAlreadyAnswered = true
            existingResponse = doesQuestionExists.answers[i]
            existingResponse.answer = answer
            updatedAnnswers.push(existingResponse)
        }else{
            updatedAnnswers.push(doesQuestionExists.answers[i])
        }    
    } 

    if(!userAlreadyAnswered){
        return res.status(404).send({"message " : "You have not answered the question"})
    }

    //Updating the answer present in the database.
    questionModel.updateOne({_id : question_id }, {
        $set : {
            answers : updatedAnnswers
        }
    }).then(()=>{
        logger.info("PUT request for update answers returned 201 OK.")
        res.status(201).send({
            "message": "Answer updated successfully",
            "quesiton-id" : questionId
        })
    }).catch((err)=>{
        logger.error(`Update answer POST request failed with  ${err.message}`)
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

    //Validating if user is authorized
    const { _status, _message } = await checkIfUserIsAuthorized(req.user._id, _id)
    if(_status != 200){
        return res.status(_status).send({_message})
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

    logger.info("GET request for view answers returned 200 OK.")
    res.status(200).send(response)
}

async function checkIfUserIsAuthorized(authUserId, _id){
    //console.log(authUserId + " " + _id)
    let userAuthorized = (authUserId == _id)
    const response = {
        _status : "",
        _message : ""
    }
    if(!userAuthorized){
        response._status = 403;
        response._message = "You must be logged in to continue."
        logger.error("User is not authorized. ERROR_CODE 403 returned.")
    }else{
        response._status = 200;
    }

    return response
}

export { addQuestion, addAnswer, getAnswersByQuestionId, updateAnswer }