const fs = require('fs');

console.log("Este mensaje está AL COMIENZO del código")

fs.readFile('test.txt', 'utf8', show_file);

function show_file(err, data) {
    console.log("---> Comienzo del fichero leido")
    console.log(data)
    console.log("---> Final del fichero")
}

console.log("Este mensaje está al FINAL del código")
