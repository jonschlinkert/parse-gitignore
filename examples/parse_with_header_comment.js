'use strict';

const fs = require('fs');
const path = require('path');
const gitignore = require('..');

const filepath = path.join(__dirname, '../test/fixtures/_gitignore_with_header');

console.dir(gitignore.parse(fs.readFileSync(filepath)).sections, { depth: null });
