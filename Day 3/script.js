var fileSys = require('fs');

exports.open = function (mode) {
    fileSys.open('file.txt', mode, function (e, file) {
        if (e) {
            throw e;
        }
        console.log('File opened');
    })
};

exports.write = function (data) {
    fileSys.writeFile('file.txt', data, function (e) {
        if (e) {
            throw e;
        }
        console.log('File saved');
    })
};

exports.append = function (data) {
    fileSys.appendFile('file.txt', data, function (e) {
        if (e) {
            throw e;
        }
        console.log('File appended');
    })
};

exports.delete = function () {
    fileSys.unlink('file.txt', function (e) {
        if (e) {
            throw e;
        }
        console.log('File deleted');
    })
};

exports.rename = function () {
    fileSys.rename('file.txt', 'renamedfile.txt', function (e) {
        if (e) {
            throw e;
        }
        console.log('File renamed');
    })
};