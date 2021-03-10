'use strict';

const fs = require('fs');
const glob = require('glob-fs')({ builtins: true });
const parse = require('..');
const files = [];

parse(fs.readFileSync(__dirname + '/_gitignore')).then((ignore) => {
  glob.readdirStream('*', { ignore, cwd: __dirname })
    .on('data', file => files.push(file.path))
    .on('end', () => console.log(files));
}).catch((error) => {
  console.error(error);
});
