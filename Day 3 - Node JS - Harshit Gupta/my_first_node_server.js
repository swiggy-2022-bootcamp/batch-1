var http = require('http');
// let date = require('./my_first_node_module')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type':'text/plain' });
    // res.write("Current Date is: ", date.myDateTime());
    res.end("Hello World!");
}).listen(8080, ()=>{console.info('Server started at port 8080')});