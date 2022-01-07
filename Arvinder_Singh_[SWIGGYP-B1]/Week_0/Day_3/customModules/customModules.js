const fs = require('fs');

module.exports.home = function (req,res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Home page");
    res.end();
};

module.exports.readFile = function (req,res){
    fs.readFile('./demo.html', function(err, data) {

        try {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
        } catch (error) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("Something went wrong");
            res.end();
        }
        return res.end();
    });
}

module.exports.openFile = function (req,res){
    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
      });
    return res.end();

}

module.exports.unlinkFile = function (req,res){
    fs.unlink('mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
    return res.end();

}

//leaving others methods for coding, will be giving them read only, because all other methods work in same way. 