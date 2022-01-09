const jwt = require('jsonwebtoken');
const JWT_KEY = require('../../secrets')

function protectRoute(req,res,next){
    if(req.cookies.login){
        let isVerified=jwt.verify(req.cookies.login,JWT_KEY.JWT_KEY);
        if(isVerified)
        {
            next();
        }
        else{
            return res.status(403).json({message :'user not verified'});
        }
    }
    else
    {
        return res.status(403).json({
            message:'operation not allowed'
        });
    }
}

module.exports=protectRoute;