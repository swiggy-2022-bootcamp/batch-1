const User=require('../models/user');

const register = (req,res)=>{
    const newuser = new User(req.body);
    console.log(newuser);

    if(newuser.password!=newuser.confirmPassword)return res.status(400).json({message: "password not match"});
    
    User.findOne({email:newuser.email},function(err,user){
        if(user) return res.status(400).json({ auth : false, message :"email exits"});
 
        newuser.save((err,doc)=>{
            if(err) {console.log(err);
                return res.status(400).json({ success : false, error : err.message});}
            res.status(201).json({
                succes:true,
                user : doc
            });
        });
    });
}

const login =  (req,res)=>{ 
    let token=req.cookies.auth;
    User.findByToken(token,(err,user)=>{
        if(err) return  res(err);
        if(user) return res.status(400).json({
            error :true,
            message:"You are already logged in"
        });
    
        else{
            User.findOne({'email':req.body.email},function(err,user){
                if(!user) return res.status(401).json({isAuth : false, message : ' Auth failed ,email not found'});
        
                user.comparepassword(req.body.password,(err,isMatch)=>{
                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
        
                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    res.status(201).cookie('auth',user.token).json({
                        isAuth : true,
                        id : user._id,
                        email : user.email
                    });
                });    
            });
          });
        }
    });
}

const logout = (req, res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
}

const profile = (req, res)=>{
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.firstname + req.user.lastname
        
    })
}

module.exports = {
    register,
    login,
    logout,
    profile,
};
