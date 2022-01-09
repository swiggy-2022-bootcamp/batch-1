const auth = require('../middleware/auth');
class handlers {
    constructor(usecase) {
      this.usecase = usecase
    }
    async createUser(req, res) {
        const payload = req.body;
            try {
              const data = await this.usecase.createUser(payload)
              res.status(201).json({
                status: 'success',
                message: 'User created successfully',
                data: data
              });
            } catch (error) {
              res.json({
                status: 'error',
                message: error.message,
            });
        } 
    
      }
    async userLogin(req, res) {
      const payload = req.body
          try {
            const data = await this.usecase.userLogin(payload)
            res.status(200).json({
              status: 'success',
              message: 'Login successful',
              data: data
            });
          } catch (error) {
            res.json({
              status: 'error',
              message: error.message,
            });
          }
      };  
     
        };   

module.exports = handlers