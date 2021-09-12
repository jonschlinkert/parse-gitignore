'use strict';

const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../.gitignore');
const parsed = gitignore(filepath);

// console.log(parsed);
// console.log(gitignore.format(parsed.sections));
console.log(parsed.globs());
