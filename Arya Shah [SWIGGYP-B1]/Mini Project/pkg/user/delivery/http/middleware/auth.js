const jwt = require('jsonwebtoken')

const auth = async(req, res, next) => {
    const token = req.header("token")
    try {
        const data = jwt.verify(token, '8hhg5f56g7t67');
        if (!data) {
            res.status(401).send({ error: 'Not authorized' })
        }
        next();
    } catch (error) {
      res.status(400).json({
         status: 'erorr',
         message: 'Invalid Signature',
         data: error
     });
    }
}

module.exports = auth
