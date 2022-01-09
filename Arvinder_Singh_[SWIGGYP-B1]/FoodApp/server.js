require('dotenv').config();
const express       = require('express');
const app           = express();
const PORT          = process.env.PORT || 3000;


//DB connection
const connectDB = require('./app/config/mongoDB');
connectDB();

//< -------  ------- template engine and others  ------- >
app.use(express.json());
//app.use(express.static('public'));
//app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'ejs');
//< -------  -------  -------  -------  -------  ------- >

//< -------  -------  routes  -------  ------- >
app.use('/api', require('./routes/registerAndAuthenticate'));
app.use('/api/users', require('./routes/users'));
app.use('/api/food', require('./routes/food'));
//< -------  -------  -------  -------  ------- >

app.listen(PORT, console.log(`Listening on port ${PORT}. @ => ${process.env.APP_BASE_URL}`));