import questionModel from "../models/question.js"
import {logger} from "../utils/logger.js"
import {ObjectId} from "mongodb"

export const addQuestionToDb = (question, res)=>{
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

export const addAnswerToDb = (doesQuestionExists, req, res)=>{
    const questionId = req.params.questionId
    const { answer } = req.body.question
    const userId = req.user._id

    const _id = new ObjectId(userId)
    let userAlreadyAnswered = false
    for(let i in doesQuestionExists.answers){
        if((doesQuestionExists.answers[i].user).equals(_id)) {
            userAlreadyAnswered = true
            break;
        }    
    }

    if(userAlreadyAnswered){
        return res.status(409).send({message: "You have already answered the question"})
    }

    const question_id = new ObjectId(questionId)
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

export const updateAnswerToDb = (doesQuestionExists, req, res) => {
    // Checking if the current user has already answered the question

    const questionId = req.params.questionId
    const { answer } = req.body.question
    const userId = req.user._id
    const _id = new ObjectId(userId)
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
    const question_id = new ObjectId(questionId)
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

export const checkIfQuestionExists = async (questionId) =>{
    const question_id = new ObjectId(questionId)
    const doesQuestionExists = await questionModel.findOne({"_id" : question_id})
    return doesQuestionExists
}