import Question from '../model/question.js'
import {ObjectId} from "mongodb"
import { validate } from "../services/user.js";

const addQuestionController = async(req, res) => {
    const user_details = req.body.user_details;
    const {title, body} = req.body.question;

    const {status, message, user} = await validate(user_details);

    if(status != 200){
        return res.status(status).json({message: message});
    }

    try{
        Question.create({
            user: user,
            title: title,
            body: body
        }).then((question_doc) => {
            return res.status(201).json({ status: 'ok', message: 'Question posted Succesfully', question_id: question_doc._id})
        })
        
    } catch(error){
        return res.json({status: 'error', error: error.message});
    }
}

const answerQuestionController = async(req, res) => {
    const user_details = req.body.user_details;
    const question_id = req.params.question_id;

    const {status, message, user} = await validate(user_details);
    if(status != 200){
        return res.status(status).json({message: message});
    }

    const q_id = new ObjectId(question_id);
    const question = await Question.findOne({"_id": q_id});
    if(!question){
        return res.status(404).send({"messsage": "Invalid Question Id"});
    } 
    let answered_already = false;
    const _id = new ObjectId(user);
    for(let i in question.answers){
        if((question.answers[i].user).equals(_id)){
            answered_already = true;
            break;
        }
    }

    if(answered_already){
        return res.status(409).json({message: "Already answered the question"});
    }

    try{
        Question.updateOne({_id: q_id},{
            $push: {
                answers: {
                    user: user,
                    answer: answer
                }
            }
        }).then(() => {
            res.status(201).json({message: "Answer posted succesfully", question_id: question_id});
        })
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const updateAnswerController = async(req, res) => {
    const user_details = req.body.user_details;
    const question_id = req.params.question_id

    const {status, message, user} = await validate(user_details);
    if(status != 200){
        res.status(200).json({message: 'message'});
    }

    const q_id = new ObjectId(question_id);
    const question = await Question.findOne({"_id": q_id});
    if(!question){
        return res.status(404).send({"messsage": "Invalid Question Id"});
    } 

    let answered_already = false;
    const _id = new ObjectId(user);
    let new_answers = []
    let prev_answer = ""

    for(let i in question.answers){
        if((question.answers[i].user).equals(_id)){
            answered_already = true;
            prev_answer = question.answers[i];
            prev_answer.answer = answer;
            new_answers.push(prev_answer);
        } else{
            new_answers.push(question.answers[i]);
        }
    }

    if(!answered_already){
        return res.status(404).json({message: "Not answered the question previously"});
    }

    try{
        Question.updateOne({_id: q_id}, {
            $set: {answers: new_answers}
        }).then(() => {
            res.status(201).json({message: "Answer updated successfully", question_id: question_id});
        })
    } catch(error){
        res.status(500).json({message: error.message});
    }
}

const getQuestionsController = async(req, res) => {
    const user_details = req.body.user_details;
    const question_id = req.params.question_id;

    const {status, message, user} = await validate(user_details);
    if(status != 200){
        return res.status(status).json({message: message});
    }

    const q_id = new ObjectId(question_id);
    const question = await Question.findOne({"_id": q_id});
    if(!question){
        return res.status(404).send({"messsage": "Invalid Question Id"});
    } 

    let response ={
        question: question.title,
        answers: []
    }

    for(let i in question.answers){
        response.answers.push({"answer": question.answers[i].answer});
    }
    res.status(200).send(response);
}

export {addQuestionController, answerQuestionController, updateAnswerController, getQuestionsController};