'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob-fs')({ builtins: true });
const parse = require('..');
const files = [];

const ignore = parse(fs.readFileSync(__dirname + '/_gitignore'));

glob.readdirStream('*', { ignore, cwd: __dirname })
  .on('data', file => files.push(file.path))
  .on('end', () => console.log(files));
