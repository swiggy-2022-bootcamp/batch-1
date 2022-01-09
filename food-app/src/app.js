const express = require('express');
const { StatusCodes } = require('http-status-codes');

const app = express();
const setupRoutes = require('./modules');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/', setupRoutes());
app.use((data, req, res, _next) => res.json(data));

// not found handler
app.use('*', (req, res) =>
  res
    .status(StatusCodes.METHOD_NOT_ALLOWED)
    .json({ error: { message: 'not found' }, is_success: false })
);

module.exports = app;
