const auth = require('../middleware/auth');
class handlers {
    constructor(usecase) {
      this.usecase = usecase
    }
    async createAnswer(req, res) {
        const payload = req.body;
            try {
              const data = await this.usecase.createAnswer(payload)
              res.status(201).json({
                status: 'success',
                message: 'Answer created successfully',
                data: {answer: data.answer, emails: data.emails}
              });
            } catch (error) {
              res.json({
                status: 'error',
                message: error.message,
            });
        }   
      }

      async viewAnswer(req, res) {
        try {
          const questionId = req.params.questionId
          const data = await this.usecase.viewAnswer(questionId)
          if (data) {
            res.status(200).json({
              status: 'success',
              message: 'Listing all Answers For Question',
              data:  data
            });      
          } else {
            res.status(200).json({
              status: 'error',
              message: 'No available Answers to Question',
              data: error
            });
          }
        } catch (error) {
          res.json({
            status: 'error',
            message: error.message,
         });
        }
      }
      async voteAnswer(req,res) {
        try {
          const vote = req.query.vote
          const answerId = req.params.answerId
          const userId = req.params.userId
          const data = await this.usecase.voteAnswer(vote, answerId, userId)
         if (vote==='upvote') {
          res.status(200).json({
            status: 'success',
            message: 'Upvote successfully',
            data: data
          })
         }else{
         res.status(200).json({
          status: 'success',
          message: 'downvote successfully',
          data: data
          })
         }
        } catch (error) {
          res.json({
            status: 'error',
            message: error.message,
          });
        }
      }
    }
        
module.exports = handlers