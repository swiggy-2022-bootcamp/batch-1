import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import {logger} from "../utils/logger.js"

//function to add user to the database
export const addUserToDb = async ( req, res ) => {
    let { name, email, password } = req.body
    const userRequest = {
        name,
        email,
        password
    }

    //hashing user password
    const encryptedPassword = await bcrypt.hash(userRequest.password, 10);
    userRequest.password = encryptedPassword;
    
    //Validating if user already exists in the database
    const userExists = await userModel.exists({
        email
    })
    if(userExists){
        logger.error("POST request for user registration returned 409 CONFLICT")
        return res.status(409).send({
            message: "User already exists!"
        })
    }

    //adding to the database
    userModel.create(userRequest).then(()=>{
        logger.info("POST request for user registration returned 201 CREATED")
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

//function to validate user credentials
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

export { validateUser }