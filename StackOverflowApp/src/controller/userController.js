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
        return res.status(400).send(err)
    })
}

/**
 * Controller for login request
 * @param req { email, password }
 * @params res 
 */
const loginController = async (req,res)=>{
    let { email, password } = req.body;

    const userExists = await userModel.findOne({ email })
    if(userExists){
        const passwordMatched = await bcrypt.compare(password, userExists.password)
        if(passwordMatched){
            res.status(200).send({
                "message" : "user logged in successfully"
            })
        }else {
            res.status(401).send({
                "message" : "Sorry invalid credentials !!!"
            })
        }
    }
    else{
        return res.status(404).send({
            "message" : "User doesn't exist"
        })
    }
}
   

export { registerController, loginController }