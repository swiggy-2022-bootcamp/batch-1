class questionUsecase {
    constructor(repo) {
      this.repo = repo;
  
    }
  
    async askQuestion(payload) {
      try {
        const data = await this.repo.askQuestion(payload)
        return data
      } catch (error) {
        throw error
      }
    }

    async viewQuestion() {
      try {
        const data = await this.repo.viewQuestion()
        return data
      } catch (error) {
        throw error
      }
    }
    
    async voteQuestion(vote, questionId, userId) {
      try {
        const data = await this.repo.voteQuestion(vote, questionId,userId)
        return data
      } catch (error) {
        throw error
      }
    }

    async answerQuestion(userId, questionId, answer) {
      try {
        const data = await this.repo.answerQuestion(userId, questionId, answer)
        return data
      } catch (error) {
        throw error        
      }
    }
    async subscribe(questionId, email) {
      try {
        const data = await this.repo.subscribe(questionId, email)
        return data
      } catch (error) {
        throw error
      }
    }
}  
module.exports = questionUsecase;