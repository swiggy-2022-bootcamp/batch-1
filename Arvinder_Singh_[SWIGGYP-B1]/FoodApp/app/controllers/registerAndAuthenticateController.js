const User = require('../../models/user');

function registerAndAuthenticateController(){
    return {
        "authenticate" : function (req, res){
            return res.status(200).json({message: 'User logged in successful'});
        },

        "resgister" : async function (req, res) {
            const {username,fullname,email,password,address,role} = req.body;
            // save
            try {
                let users = await User.find().or([{"username" : username},{"email":email}]);
                //check : username or email already exist
                if(users.length == 0){
                    //craete new user
                    let user  = new User({username,fullname,email,password,address,role});
                    user = await user.save()
                    return res.status(201).json(user);
                }else{
                    let message = "";
                    users.forEach((user) =>{
                        if(user.username === username){
                            if(message) message+= " "
                            message += "Username alrady exists."
                        }
                        if(user.email === email){
                            if(message) message+= " "
                            message += "Email alrady exists."
                        }
                    });
                    return res.status(400).json({ error: message});    
                }
        
            } catch (err) {
                return res.status(400).json({ error: `Something went wrong... 
                ${err}`});
            }   
        }
    }
}


module.exports = registerAndAuthenticateController;