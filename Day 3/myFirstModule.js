const http = require('http');
const fs = require('fs')
const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
    fs.readFile('demofile1.html',function(err,data){
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.write(data);
        return res.end()
    });
    fs.appendFile('mynewfile1.txt', 'Appending text to already existing file.', function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');
  });
  
  server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
  });