import dotenv from "dotenv";
import jwt from "jsonwebtoken"

dotenv.config();

function generateToken(_id){
    const accessToken = jwt.sign({"_id" : _id},process.env.ACCESS_TOKEN_SECRET)
    return accessToken;
}

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.status(400).send({"message" : "authorization token is missing."})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send({"message" : "Authorization token passed is incorrect"})
        req.user = user
        next();
    })
}

export { generateToken, authenticateToken}