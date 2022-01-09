// packages
import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./src/routes/routes.js"
import userRoutes from "./src/routes/userRoutes.js"
import questionRoutes from "./src/routes/questionRoutes.js"

import {logger} from "./src/utils/logger.js"

dotenv.config();
console.log("Server starting ...")
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection

connection.on("open", ()=>{
    logger.info("✅ Mongodb connected successfully");
})

connection.on("error", ()=> {
    logger.error("❌ Error while connecting mongodb")
})

connection.on("disconnected", () => {
    logger.error("❌ Mongdb disconnected");
})

app.use(routes)
app.use(userRoutes)
app.use(questionRoutes)

app.listen(PORT, ()=>{
    logger.info(`✅ Server listening on PORT ${PORT}`)
})