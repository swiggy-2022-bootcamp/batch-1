// Including the requiured modules
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')('expressapp:server');
var http = require('http');

var app = express();

// view engine setup
app.set('view engine', 'ejs');

// Using some middleware functions
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Setting default URL content
app.get('/', function(req, res, next) {
	res.setHeader('Content-Type', 'text/html');
	res.send('Welcome to Food App! Proceed to <a href="/api">/api</a> for direct access to the API.');
});

/* Get port from environment and store in Express. */
var port = process.env.PORT || 4000;
app.set('port', port);

/* Create HTTP server. */
var server = http.createServer(app);

/* Listen on provided port, on all network interfaces. */
server.listen(port, ()=>{ console.log("Localhost started on http://localhost:" + port) });
server.on('error', onError);
server.on('listening', onListening);

/* Event listener for HTTP server "error" event. */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handling specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			// break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			// break;
		default:
			throw error;
	}
}

/* Event listener for HTTP server "listening" event. */
function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	debug('Listening on ' + bind);
}

// error handler and reporter
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });


module.exports = app;