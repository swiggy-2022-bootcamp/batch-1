const userSchema=require('../../db/models/users/userSchema');
const config=require("../../utils/config");
const bcrypt=require('../../utils/bcrypt');
const jwt = require('../../utils/token');
const mailUser = require('../../utils/welcomeEmail/welcomeEmail');
const customerOperations = {
// Get user by userId : GET
      async findByUserId(userid,res){
           try{
            const user=await userSchema.findOne({id:userid});
           if(user){
                        res.status(200).json({user});
                    }
                    else{
                        res.status(404).json({status:config.ERROR,message:"Unable to find the username of the user "})
                     }
              
              
           }
           catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error"});

           }
       
    },
// Update user : PUT
    async updateByUserId(userobj,res){
        try {
            const user = await userSchema.findOne({id:userobj.id});
    
            for(let property of Object.keys(userobj)) {
                
                if(property === 'id' || property=='_id')
                continue;
    
                if(user[property])
                    user[property] = userobj[property];
            }
    
            await user.save();
            return res.status(200).json(user);
    
        } catch(err) {
            console.log(err.message);
            return res.status(404).json({status:config.ERROR,"message" : `User with id ${userobj.id} not found`});
        }
    },
// Delete user : DELETE
  async deleteByUserId(userid,res){
        try{
           const user=await userSchema.findOneAndDelete({id:userid});
            if(user){
                        res.status(200).json({status:config.SUCCESS,message:"User Deleted Successfully.",user});
                    }
                    else{
                        res.status(404).json({status:config.ERROR,message:`Sorry user with ${userid} not found.`});
        
        
                    }
             
              
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error.Please try again later!"});

        }
        
    },
// Get All Users : GET
    async getAllUsers(res){
        try{
            const users=await userSchema.find({});
           
        
               if(users) res.status(200).json({users});
                
         

        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error"});

        }
        
    },
 // Login User : POST
    async loginUser(username,password,res) {
        try{
            const user=await userSchema.findOne({username});
           
              
                    if(user) { 
                        let hashPassword=user.password;
                        let comparePassword=bcrypt.comparePassword(password,hashPassword);
                        if(comparePassword) {
                          const token=jwt.generateToken(username);
                          
                            res.status(200).json({status:config.SUCCESS,token:token,message:"User logged in successful"});
    
                          
                        }
                        else{
                            res.status(403).json({status:config.FAILURE,message:"Please enter correct details"});
    
                        }
                    }
                    else{
                        res.status(200).json({status:config.FAILURE,message:"User is not registered.Please Register Yourself First"});
                    }
           
        }
        catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error"});

        }
     
    },

// Register User : POST
    async registerUser(newUserObject,res) {
        try{
            const user=await userSchema.findOne({username:newUserObject.username});
         
               if(user) {
                        res.status(200).json({status:config.FAILURE,message:"Email ID already Exists . Please Login "});
                    }
                    else{
                        newUserObject.password=bcrypt.convertPassword(newUserObject.password);
                        userSchema.create(newUserObject,(err,doc)=> {
                            if(err) {
                                res.status(500).json({status:config.ERROR,message:"Unable to add the user.Check all fields and try again later!"});
                            }
                            else{
                                mailUser(newUserObject.email,newUserObject.username);
                                res.status(201).json({status:config.SUCCESS,message:"Registered Successfully",doc});
                            }    
                        })
                    }
                
           
        }catch(err){
            res.status(500).json({status:config.ERROR,message:"Internal Server Error"});

           
        }
       
    },
   
   
}
module.exports=customerOperations;