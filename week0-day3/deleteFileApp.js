var fs = require('fs');

fs.unlink('file3.txt', function () {
  console.log('File deleted successfully!');
});
