const transporter = require('../../emails/mail')
class answerUsecase {
    constructor(repo, questionRepo) {
      this.repo = repo;
      this.questionRepo = questionRepo;
    }
  
    async createAnswer(payload) {
      try {
        const answer = await this.repo.createAnswer(payload)
        const questionId = payload.questionId
        const emails = await this.questionRepo.getQuestionSubscribers(questionId)
        emails.map(address => {
       // config for mailserver and mail, input your data
       const mailOptions = {
        from: 'gothamherobat@gmail.com', // sender address
        to: address, // list of receivers
        subject: 'StackOverflow Answer Notification', // Subject line
        html: '<p>An answer has been given to a question you are subscribed to</p>'// plain text body
      };
      transporter.sendMail(mailOptions, function (err, info) {
              if(err)
                console.log(err)
              else
                console.log(info);
          });  
        })
        return {answer, emails}
      } catch (error) {
        throw error
      }
    }

    async viewAnswer(questionId) {
      try {
        const data = await this.repo.viewAnswer(questionId)
        return data
      } catch (error) {
        throw error
      }
    }
    
    async voteAnswer(vote, answerId, userId) {
      try {
        const data = await this.repo.voteAnswer(vote, answerId,userId)
        return data
      } catch (error) {
        throw error
      }
    }
}  
module.exports = answerUsecase;