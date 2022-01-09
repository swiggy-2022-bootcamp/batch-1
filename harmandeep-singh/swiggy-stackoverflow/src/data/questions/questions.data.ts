import Question from "../../models/question.model";
import Answer from "../../models/answer.model";
import User from "../../models/user.model";
import { config } from "../../config";

type Question = {
    title: string
    body: string
}

type RESPONSE = {
    status: number
    message: string
}

export const saveQuestion = async (data: Question, userId: string): Promise<string> => {
    const question = await Question.create({
        body: data.body,
        title: data.title,
        user: userId
    });
    return question._id;
}

export const addQuestionToUser = async (questionId: string, userId: string): Promise<void> => {
    const user = await User.findById(userId);
    user.questions.push(questionId);
    await user.save();
}
export const saveAnswer = async (questionId: string, updatedAns: string, userId: string): Promise<string> => {
    const answer = await Answer.create({
        body: updatedAns,
        question: questionId,
        user: userId
    });
    return answer._id;
}
export const addAnswerToUser = async (answerId: string, userId: string): Promise<void> => {
    const user = await User.findById(userId);
    user.answers.push(answerId);
    await user.save();
}
export const addAnswerToQuestion = async (answerId: string, questionId: string): Promise<void> => {
    const question = await Question.findById(questionId);
    question.answers.push(answerId);
    await question.save();
}

export const getQuestion = async (questionid: string): Promise<any> => {
    return await Question.findById(questionid)
        .populate('user')
        .populate('answers');
}

export const getQuestions = async (page: number, limit: number): Promise<any> => {
    return await Question.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('answers')
        .populate('user')
        .exec();
}
export const updateQuestion = async (data: Question, id: string, userId: string): Promise<RESPONSE> => {
    try {
        const user = await User.findById(userId);
        const isAuthorized = user.questions.includes(id);
        if (!isAuthorized) {
            return {
                status: config.STATUS.UNAUTHORIZED,
                message: 'Unauthorized'
            };
        }
        await Question.findByIdAndUpdate(id, data, { new: true });
        return {
            status: config.STATUS.SUCCESS,
            message: "Question updated successfully"
        };
    }
    catch (error) {
        return {
            status: config.STATUS.INTERNAL_SERVER_ERROR,
            message: "Error updating question"
        };
    }
}

export const deleteQuestion = async (id: string, userId: string): Promise<RESPONSE> => {
    try {
        const user = await User.findById(userId);
        const isAuthorized = user.questions.includes(id);
        if (!isAuthorized) {
            return {
                status: config.STATUS.UNAUTHORIZED,
                message: 'Unauthorized'
            };
        }
        // delete from question
        await Question.findByIdAndDelete(id);
        // delete from Answers
        await Answer.deleteMany({ question: id });
        // delete from user
        await User.findByIdAndUpdate(userId, { $pull: { questions: id } });
        return {
            status: config.STATUS.SUCCESS,
            message: "Question deleted successfully"
        };
    }
    catch (err) {
        return {
            status: config.STATUS.INTERNAL_SERVER_ERROR,
            message: "Error deleting question"
        };
    }
}



export const updateAnswer = async (data: string, id: string, userId: string): Promise<RESPONSE> => {
    try {
        const answer = await Answer.findOne({ user: userId, "question": id }).exec();
        if (!answer) {
            return {
                status: config.STATUS.NOT_FOUND,
                message: "Answer not found"
            };
        }

        const user = await User.findById(userId);
        const isAuthorized = user.answers.includes(answer._id);
        if (!isAuthorized) {
            return {
                status: config.STATUS.UNAUTHORIZED,
                message: 'Unauthorized'
            };
        }

        answer.body = data;
        await answer.save();
        return {
            status: config.STATUS.SUCCESS,
            message: "Answer updated successfully"
        };
    }
    catch (err) {
        return {
            status: config.STATUS.INTERNAL_SERVER_ERROR,
            message: "Error updating answer"
        };
    }
}

export const deleteAnswer = async (id: string, userId: string): Promise<RESPONSE> => {
    try {
        const answer = await Answer.findOne({ user: userId, question: id }).exec();
        if (!answer) {
            return {
                status: config.STATUS.NOT_FOUND,
                message: "Answer not found"
            };
        }

        const user = await User.findById(userId);
        const isAuthorized = user.answers.includes(answer._id);
        if (!isAuthorized) {
            return {
                status: config.STATUS.UNAUTHORIZED,
                message: 'Unauthorized'
            };
        }
        const answerId = answer._id;
        // delete from Question
        await Question.findByIdAndUpdate(id, { $pull: { answers: answerId } });
        // delete from User
        await User.findByIdAndUpdate(userId, { $pull: { answers: answerId } });
        // delete from Answer
        await Answer.findByIdAndDelete(answerId);
        return {
            status: config.STATUS.SUCCESS,
            message: "Answer deleted successfully"
        };
    }
    catch (err) {
        return {
            status: config.STATUS.INTERNAL_SERVER_ERROR,
            message: "Error deleting answer"
        };
    }
}