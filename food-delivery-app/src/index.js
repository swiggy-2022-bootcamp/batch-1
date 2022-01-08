const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;

mongoose
  .connect(config.mongoose.url, config.mongoose.options)
  .then(() => {
    console.log(`MongoDB connected and listening at ${config.mongoose.url}`);
  })
  .catch((error) => {
    console.log(error.message);
  });

server = app.listen(config.port || 3000, '127.0.0.1', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(
    `Express App connected and listening at http://[${host}]:${port}`
  );
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
