var fs = require('fs');


// deletes a file

fs.unlink('demoFile2.txt', function (err) {

    if (err) {
        throw err;
    }
    console.log('demoFile2.txt deleted!');
});