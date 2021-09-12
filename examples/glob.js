'use strict';

const start = Date.now();
process.on('exit', () => console.error(`Total: ${Date.now() - start}ms`));

const fs = require('fs');
const path = require('path');
const glob = require('matched');
const gitignore = require('..');

const { globs } = gitignore(fs.readFileSync(path.join(__dirname, '../.gitignore')));
const results = globs({ ignore: '{.git,test/fixtures,examples}/**' });
// const ignore = results.flatMap(e => e.type === 'ignore' ? e.patterns : e.patterns.map(p => `!${p}`));
const ignore = results.flatMap(e => e.type === 'ignore' ? e.patterns : e.patterns);

glob('**', { cwd: path.join(__dirname, '..'), ignore: ignore, dot: true, nodir: true, nocase: true })
  .then(files => {
    console.log(files);
    console.log(files.length);
  })
  .catch(console.error);
