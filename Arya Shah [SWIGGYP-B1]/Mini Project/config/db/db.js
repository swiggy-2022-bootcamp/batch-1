const mongoose = require('mongoose')
module.exports = {
   async connectMongodb() {
       try {
          await mongoose.connect( process.env.mongo_url || 'mongodb://localhost:27017/stackoverflownew',{ useNewUrlParser: true })
          console.log("Database has been successfully connected")
       } catch (error) {
           console.log(error)
       }
   }
}