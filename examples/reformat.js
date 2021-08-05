'use strict';

const fs = require('fs');
const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../.gitignore');
const parsed = gitignore.parse(filepath);

console.log(parsed);
console.log(gitignore.stringify(parsed.sections));
