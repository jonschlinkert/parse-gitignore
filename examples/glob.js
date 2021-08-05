'use strict';

const start = Date.now();
process.on('exit', () => console.error(`Total: ${Date.now() - start}ms`));

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parse = require('..');
const files = [];

const ignore = parse(fs.readFileSync(path.join(__dirname, '../test/fixtures/_gitignore')));

glob('*', { ignore, cwd: __dirname }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log(files);
  }
});
