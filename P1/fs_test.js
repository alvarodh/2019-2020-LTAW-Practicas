const fs = require('fs');

function show_file(err, data) {
    console.log(data)
}

fs.readFile('test.txt', 'utf8', show_file);
