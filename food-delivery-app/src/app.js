const express = require('express');
const compression = require('compression');
const cors = require('cors');
const httpStatus = require('http-status');
const routes = require('./routes/api');
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

app.use((err, req, res, next) => {
  if (err) {
    res.status(httpStatus.NOT_FOUND);
    res.send({ message: 'Not found' });
  } else {
    next(
      new Error(httpStatus.INTERNAL_SERVER_ERROR + ' Something went wrong!')
    );
  }
});

module.exports = app;
