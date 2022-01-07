const http = require('http');
const fs = require('fs');
const mymodule = require('./mymodule');

mymodule.printSomething();

fs.readFile('dummy.html', (err, data) => {
    if(err) {
        console.log("Error opening the dummy: ", err);
        return;
    }

    fs.appendFile('anotherDummy.html', data, (err) => {
        if(err)
            console.log("Error while appending to anotherDummy: ", err);
    })

    fs.writeFile('anotherDummy.html', "<html><body>Nothing Here!</body></html>", (err) => {
        if(err)
            console.log("Error while writing to anotherDummy: ", err);
    })

})

fs.rename('dummy.html', 'bigdummy.html', (err) => {
    if(err) {
        console.log(err);
    }
})

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
}).listen(8080);