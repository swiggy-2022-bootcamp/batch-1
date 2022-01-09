import express from 'express';
import router from './routes/index';
import mongooseLoader from './data/mongoose-loader/mongoose.loader';
import { config } from './config';


const app = express();
app.use(express.json());
app.use(config.BASE_URL, router());

mongooseLoader().then(() => {
    console.log('Mongoose connected');
});

app.listen(config.PORT, () => {
    console.log(`Stack-Overflow app listening on port ${config.PORT}!`);
});