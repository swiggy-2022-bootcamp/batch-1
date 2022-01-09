const auth = require('../middleware/auth');
class handlers {
    constructor(usecase) {
      this.usecase = usecase
    }
    async askQuestion(req, res) {
        const payload = req.body;
            try {
              const data = await this.usecase.askQuestion(payload)
              res.status(201).json({
                status: 'success',
                message: 'Question created successfully',
                data: data
              });
            } catch (error) {
              res.json({
                status: 'error',
                message: error.message,
            });
        }   
      }

      async viewQuestion(req, res) {
        try {
          const data = await this.usecase.viewQuestion()
          if (data) {
            res.status(200).json({
              status: 'success',
              message: 'Listing all Questions',
              data:  data
            });      
          } else {
            res.status(200).json({
              status: 'error',
              message: 'No available Questions',
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

      async voteQuestion(req,res) {
        try {
          const vote = req.query.vote
          const questionId = req.params.questionId
          const userId = req.params.userId
          const data = await this.usecase.voteQuestion(vote, questionId, userId)
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

      async answerQuestion(req,res) {
        try {
          const userId =  req.params.userId
          const questionId = req.params.questionId
          const answer = req.body
          const data = await this.usecase.answerQuestion(userId, questionId, answer)
          res.status(200).json({
            status: 'success',
            message: 'Question answered successfully',
            data: answer
          })
        } catch (error) {
          res.json({
            status: 'error',
            message: error.message,
          });
        }
      }
      async subscribe(req,res) {
        try {
          const questionId = req.params.questionId
          const email = req.params.email
          const data = await this.usecase.subscribe(questionId, email)
          res.status(200).json({
            status: 'success',
            message: 'Question subscribed successfully',
            data: data
          })
        } catch (error) {
          res.json({
            status: 'error',
            message: error.message,
          });
        }
      }
    }    
module.exports = handlers