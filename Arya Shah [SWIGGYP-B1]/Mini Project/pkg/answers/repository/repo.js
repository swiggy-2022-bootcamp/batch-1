const answerModel = require('../../../model/answers/answer');
const mongoose = require('mongoose');

class answerRepository {
    async createAnswer(payload){
        try {
            await answerModel.create(payload)
            return payload
        } catch (error) {
            throw error
        }
    }

    async viewAnswer(questionId){
        try {
            const data = await answerModel.find({questionId: mongoose.Types.ObjectId(questionId)});
            return data;
          } catch (error) {
            throw error
        }
    }

    async voteAnswer(vote, answerId, userId,){
        try {
            if (vote === 'upvote') {
                await answerModel.update({ _id:  mongoose.Types.ObjectId(answerId)},{$push: {upVote: {userId}}})
            }
            await answerModel.update({ _id:  mongoose.Types.ObjectId(answerId)},{$push: {downVote: {userId}}})
            const data = "answer voted"
            return data
        } catch (error) {
            throw error
        }
    }

}
module.exports = answerRepository