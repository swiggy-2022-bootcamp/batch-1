var fs = require('fs');

fs.appendFile('./Files/demo.txt', 'This is i++ bootcamp.\n', function (err) {
    if (err) throw err;
    console.log('Updated!');
});