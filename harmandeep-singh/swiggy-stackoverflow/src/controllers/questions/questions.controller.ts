import { Request, Response } from 'express';
import { config } from '../../config';
import {
    saveAnswer,
    saveQuestion,
    addQuestionToUser,
    addAnswerToUser,
    getQuestion as getQuestionData,
    getQuestions as getQuestionsData,
    updateQuestion as updateQuestionData,
    deleteQuestion as deleteQuestionData,
    updateAnswer as updateAnswerData,
    deleteAnswer as deleteAnswerData,
    addAnswerToQuestion,
} from '../../data/questions/questions.data';

export const addQuestion = async (req: Request, res: Response) => {
    const userId = res.locals.id;
    const id: string = await saveQuestion(req.body, userId);
    await addQuestionToUser(id, userId);
    const response = {
        "question-id": id,
        "message": 'Question posted successfully'
    }
    res.status(config.STATUS.CREATED).send(response);
}

export const addAnswer = async (req: Request, res: Response) => {
    const userId = res.locals.id;
    const questionId = req.params.questionid;
    const answer = req.body.answer

    const answerId: string = await saveAnswer(questionId, answer, userId);
    await addAnswerToUser(answerId, userId);
    await addAnswerToQuestion(answerId, questionId);
    const response = {
        "question-id": questionId,
        "message": 'Answer posted successfully'
    }
    res.status(config.STATUS.CREATED).send(response);
}

export const getQuestion = async (req: Request, res: Response) => {
    const questionId = req.params.questionid;
    const question = await getQuestionData(questionId);
    res.status(config.STATUS.SUCCESS).send(question);
}

export const getQuestions = async (req: Request, res: Response) => {
    const page = req.query.page ? req.query.page : "1";
    const limit = req.query.limit ? req.query.limit : "10";
    const questions = await getQuestionsData(Number(page), Number(limit));
    res.status(config.STATUS.SUCCESS).send(questions);
}

export const updateQuestion = async (req: Request, res: Response) => {
    const questionId = req.params.questionid;
    const userId = res.locals.id;
    const { status, message } = await updateQuestionData(req.body, questionId, userId);
    res.status(status).send({ message });
}

export const updateAnswer = async (req: Request, res: Response) => {
    const questionId = req.params.questionid;
    const userId = res.locals.id;
    const { status, message } = await updateAnswerData(req.body.answer, questionId, userId);
    res.status(status).send({ message });
}

export const deleteQuestion = async (req: Request, res: Response) => {
    const questionId = req.params.questionid;
    const userId = res.locals.id;
    const { status, message } = await deleteQuestionData(questionId, userId);
    res.status(status).send({ message });
}

export const deleteAnswer = async (req: Request, res: Response) => {
    const questionId = req.params.questionid;
    const userId = res.locals.id;
    const { status, message } = await deleteAnswerData(questionId, userId);
    res.status(status).send({ message });
}
