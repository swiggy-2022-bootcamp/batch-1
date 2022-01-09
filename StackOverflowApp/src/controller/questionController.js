import { validateUser } from "../services/userService.js"
import { logger } from "../utils/logger.js"
import { addQuestionToDb, checkIfQuestionExists, addAnswerToDb, updateAnswerToDb } from "../services/questionService.js"

/**
 * Controller for post question request
 * @param req { user-details : {email, password }, question : {title, body} }
 * @param res 
 * @returns 
 */
const addQuestion = async (req,res)=>{
    const userDetails = req.body["user-details"];
    const { question } = req.body
    
    //Vaidating if user credentials are correct
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

    //adding question to the database
    addQuestionToDb(question, res)
    

}

/**
 * Controller for post answer request
 * @param req { user-details : {email, password }, question : {question-id, answer} }
 * @param res 
 * @returns 
 */
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

    //Validating if the question exists or not
    const doesQuestionExists = await checkIfQuestionExists(questionId) 
    if(!doesQuestionExists){
        return res.status(404).send({"message" : "Question doesn't exists"})
    }

    // Adding answer into the database.
    addAnswerToDb(doesQuestionExists, req, res)

}

/**
 * Controller for post answer request
 * @param req { user-details : {email, password }, question : {question-id, answer} }
 * @param res 
 * @returns 
 */
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

    //Validating if the question exists or not
    const doesQuestionExists = await checkIfQuestionExists(questionId) 
    if(!doesQuestionExists){
        return res.status(404).send({"message" : "Question doesn't exists"})
    }

    //Updating answer for a particular user
    updateAnswerToDb(doesQuestionExists, req, res)

}

/**
 * Controller for get all answers request
 * @param req { user-details : {email, password } }
 * @param res 
 * @returns 
 */
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
    const doesQuestionExists = await checkIfQuestionExists(questionId) 
    if(!doesQuestionExists){
        return res.status(404).send({"message" : "Question doesn't exists"})
    }

    //formatting response payload
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