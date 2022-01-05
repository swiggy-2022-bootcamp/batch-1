const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const write = require('./writefile');
const del = require('./deletefile');
const htmlData = '<h1>Day 3 Assignments completed!</h1><br><p>Hello World!</p>';
write.write(htmlData);
del('./uploadfile.js');
// Create a server
http.createServer((req, res) => {
    if (req.url == '/fileupload') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var oldpath = files.filetoupload.filepath;
            var newpath = path.join(__dirname, 'newFiles', files.filetoupload.originalFilename);
            fs.rename(oldpath, newpath, function (err) {
                if (err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            });
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(4001);