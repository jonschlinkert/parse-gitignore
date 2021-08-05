'use strict';

const fs = require('fs');
const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../test/fixtures/_gitignore');
const contents = fs.readFileSync(filepath, 'utf8');

// console.log(gitignore.parse(contents));
// console.log(contents.trim() === gitignore.dedupe(contents).trim());
const deduped = gitignore.dedupe(contents);
console.log(deduped);
