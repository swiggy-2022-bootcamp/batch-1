var fs = require('fs');


// opens a file in the specified mode, creates new empty file if not present

fs.open('demoFile2.txt', 'w', function (err, file) {

    if (err) {
        throw err;
    }
    console.log('Opened demoFile2.txt!');
});
