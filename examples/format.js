'use strict';

const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../.gitignore');
const res = gitignore.parse(filepath);

console.log(res);
console.log(gitignore.format(res.sections));
