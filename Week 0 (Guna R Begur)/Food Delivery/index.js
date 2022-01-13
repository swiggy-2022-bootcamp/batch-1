const mongoose = require('mongoose')
const dotenv = require('dotenv')
const express = require('express')
const register = require('./routes/register')

const app = express()
dotenv.config()

async function startServer(){
    try{
        const res = await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")

        app.use(express.json())
        app.use('/api/register', register)

        app.listen(process.env.PORT||3000,()=>console.log(`Server running on port:${process.env.PORT?process.env.PORT:3000}` ))
    
    }catch(err){
        console.log(err)
    }
}

startServer()
  