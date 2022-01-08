// packages
import express from "express"
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./src/routes/routes.js"
import userRoutes from "./src/routes/userRoutes.js"

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
    console.log("✅ Mongodb connected successfully");
})

connection.on("error", ()=> {
    console.log("❌ Error while connecting mongodb")
})

connection.on("disconnected", () => {
    console.log("❌ Mongdb disconnected");
})

app.use(routes)
app.use(userRoutes)

app.listen(PORT, ()=>{
    console.log(`✅ Server listening on PORT ${PORT}`)
})