import { generateToken } from "./auth.js"
import { addUserToDb, validateUser } from "../services/userService.js"

/**
 * Controller for register request
 * @param req { name, email, password }
 * @param res 
 * @returns 
 */
const registerController = async (req, res) => {   
    addUserToDb(req, res)
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

export { registerController, loginController }