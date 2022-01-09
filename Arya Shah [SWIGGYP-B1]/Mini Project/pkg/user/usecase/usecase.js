class userUsecase {
    constructor(repo,questionRepo, answerRepo) {
      this.repo = repo;
      this.questionRepo = questionRepo;
      this.answerRepo = answerRepo;  
    }
  
    async createUser(payload) {
      try {
        const data = await this.repo.createUser(payload)
        return data
      } catch (error) {
        throw error
      }
    }
    async userLogin(payload) {
      try {
        const data = await this.repo.userLogin(payload)
        return data
      } catch (error) {
        throw error
      }
    }
    async search(payload) {
      try {
        const userData = await this.repo.search(payload)
        const questionData = await this.questionRepo.search(payload)
        const answerData = await this.answerRepo.search(payload)
        return {userData, questionData, answerData}
      } catch (error) {
        throw error
      }
    }
}  
module.exports = userUsecase;