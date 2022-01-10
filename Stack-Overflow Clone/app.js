import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import routes from './routes/routes.js'
import userRoutes from './routes/userRoutes.js'
import questionRoutes from './routes/questionRoutes.js'
import dotenv from 'dotenv'

mongoose.connect('mongodb://localhost:27017/stack_overflow_clone');

dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

const PORT = process.env.port || 4000;

app.use(routes);
app.use(userRoutes);
app.use(questionRoutes);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})
