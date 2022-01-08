const { PORT, NODE_ENV } = process.env;

const app = require("./app");

// CREATING HTTP SERVER

const server = app.listen(port);

server.on("error", onError);
server.on("listening", onListening);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port == "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevaged privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.info(`Listening on ${bind} in ${NODE_ENV} environment...`);
}
