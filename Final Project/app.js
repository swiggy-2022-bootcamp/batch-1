const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/FoodyDb';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection

con.on('open', () => {
    console.log('Connected to the Database...')
});

app.use(express.json());

const reqRouter = require('./routes/routes');
const restRouter = require('./routes/restaurant');
app.use('/foody', reqRouter);
app.use('/foody/restaurant', restRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port} .. `)
});
