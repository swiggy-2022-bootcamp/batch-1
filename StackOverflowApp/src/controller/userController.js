import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import { generateToken, authenticateToken } from "./auth.js"

/**
 * Controller for register request
 * @param req { name, email, password }
 * @param res 
 * @returns 
 */
const registerController = async (req, res) => {
    let { name, email, password } = req.body
    const userRequest = {
        name,
        email,
        password
    }
    const encryptedPassword = await bcrypt.hash(userRequest.password, 10);
    userRequest.password = encryptedPassword;
    
    const userExists = await userModel.exists({
        email
    })
    if(userExists){
        logger.error("User is already registered. " + response.message)
        return res.status(409).send({
            message: "User already exists!"
        })
    }
    userModel.create(userRequest).then(()=>{
        logger.info("User registered successfully " + response.message)
        return res.status(201).send({
            "message" : "User registered successfully",
            "registration-name" : name
        })
    })
    .catch(err =>{
        logger.error(`User registration failed with ${err.message}`)
        return res.status(500).send({message: err.message})
    })
}

/**
 * Controller for login request
 * @param req { email, password }
 * @params res 
 */
const loginController = async (req,res)=>{
    const {status, message, _id } = await validateUser(req.body);
    const accessToken = generateToken(_id)
    return res.status(status).send({message, accessToken})

}

async function validateUser(userBody){
    const { email, password } = userBody
    const response = {
        status: null,
        message: "",
        _id: ""
    }
    const userExists = await userModel.findOne({ email })
    if(userExists){
        const passwordMatched = await bcrypt.compare(password, userExists.password)
        if(passwordMatched) {
            response.status = 200
            response.message = "User logged in successfully"
            response._id = userExists._id
            
        }
        else {
            response.status = 401
            response.message = "Sorry invalid credentials"
            logger.error("Validate user failed " + response.message)
        };
    }else {
        response.status = 404
        response.message = "User doesn't exist"
        logger.error("Validate user failed " + response.message)
    }
    return response;
}
   

export { registerController, loginController, validateUser }