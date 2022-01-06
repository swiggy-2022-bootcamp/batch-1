var http = require('http');
var fs = require('fs');

http
  .createServer(function (req, res) {
    fs.writeFile('file1.txt', 'Some random text!', function (err) {
      if (err) console.log(err);
      else console.log('File Written .');
    });
  })
  .listen(8080);
