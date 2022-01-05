// Inspired by & Credits: https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp

var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
    // console.log(req.url, req.method)
    if (req.url === '/upload' && req.method === "POST") {
        var form = new formidable.IncomingForm();
        form.parse(req, function (_err, _fields, files) {
            var oldPath = files.filetoupload.filepath;
            var newPath = './' + files.filetoupload.originalFilename;
            fs.rename(oldPath, newPath, function(error) {
                if (error) throw error;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } 
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<form action="upload" method="POST" enctype="multipart/form-data">
                        <input type="file" name="file-to-upload"><br><input type="submit">
                    </form>`);
        return res.end();
    }
}).listen(8080, ()=>{console.info('Server started at port 8080')});