import userModel from "../models/user.js";
import bcrypt from "bcrypt"
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
        return res.status(409).send({
            message: "User already exists!"
        })
    }
    userModel.create(userRequest).then(()=>{
        return res.status(201).send({
            "message" : "User registered successfully",
            "registration-name" : name
        })
    })
    .catch(err =>{
        console.log("registration failed.")
        return res.status(500).send({message: err.message})
    })
}

/**
 * Controller for login request
 * @param req { email, password }
 * @params res 
 */
const loginController = async (req,res)=>{
    const {status, message } = await validateUser(req.body);
    return res.status(status).send({message})

}

async function validateUser(userBody){
    const { email, password } = userBody
    const response = {
        status: null,
        message: "",
    }
    const userExists = await userModel.findOne({ email })
    if(userExists){
        const passwordMatched = await bcrypt.compare(password, userExists.password)
        if(passwordMatched) {
            response.status = 200
            response.message = "User logged in successfully"
        }
        else {
            response.status = 401
            response.message = "Sorry invalid credentials"
        };
    }else {
        response.status = 404
        response.message = "User doesn't exist"
    }
    return response;
}
   

export { registerController, loginController, validateUser }