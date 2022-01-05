var fs = require('fs');

fs.open('dummyFile.txt', 'w', function (err, file) {
    if (err) {
        throw err;
    }
    console.log('File opened successfully.');
});

fs.unlink('dummyFile.txt', function (err) {
    if (err) {
        throw err;
    }
    console.log('File deleted successfully.');
});