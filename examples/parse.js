const fs = require('fs');
const path = require('path');
const parse = require('..');
console.log(parse(fs.readFileSync(path.join(__dirname, '_gitignore'))));
