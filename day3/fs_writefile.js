var fs = require('fs');

fs.writeFile('mynewfile1.txt', 'This is the new text', function (err) {
  if (err) throw err;
  console.log('Saved!');
});