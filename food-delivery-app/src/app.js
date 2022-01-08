const express = require('express');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/api');
// const ApiError = require('./utils/ApiError');
const { jwtStrategy } = require('./config/passport');
const helmet = require('helmet');
const passport = require('passport');

const app = express();

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(compression());

app.use(cors());
app.options('*', cors());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use('/api', routes);

app.use((req, res, next) => {
  next(new Error(httpStatus.NOT_FOUND + ' Not found'));
});

module.exports = app;
