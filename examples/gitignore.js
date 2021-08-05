const fs = require('fs');
const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../test/fixtures/_gitignore');

console.log(gitignore(fs.readFileSync(filepath)));
