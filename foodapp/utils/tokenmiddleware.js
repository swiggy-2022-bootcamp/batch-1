const tokenOpr = require('./token');
const config = require('./config');
function checkToken (request, response,next){
    var token = request.headers['auth-token'];
   
    if(token){
       
            let decoded = tokenOpr.verifyToken(token);
           
            if(!decoded){
                response.status(401).json({status:config.ERROR,message:'Invalid Token',})

            }
            else{
                next();
            }
            
           
    }
    else{
        response.status(401).json({status:config.ERROR,message:'UnAuthorized to access this Page',})
    }
    
}
module.exports = checkToken;