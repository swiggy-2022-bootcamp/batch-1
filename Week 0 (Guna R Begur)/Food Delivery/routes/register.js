const express = require('express')
const bcrypt = require('bcrypt')
const {User} = require('../models/users')

const router = express.Router()

router.post('/',async (req,res)=>{
    let user = await User.findOne({email: req.body.email}) 
    if(user){
        return res.status(400).send("Email address already exists")
    }
    
    try{
        user = new User(req.body)
        const salt = await bcrypt.genSalt(5)
        user.password = await bcrypt.hash(user.password, salt)
        const result = await user.save()

        const token = user.generateJWT()

        res.status(201).send({
            token,
            _id: result.id,
            username: result.username
        })
    }catch (err){
        return res.status(406).send(err.message)
    }
})




module.exports = router
