'use strict';

require('mocha');
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const parse = require('../');
const read = name => fs.readFileSync(path.join(__dirname, 'fixtures', name));

describe('gitignore', () => {
  it('should parse a gitignore file asynchronously and resolve to an array:', async() => {
    assert.deepEqual(await parse(read('_gitignore')), [
      'logs',
      '*.log',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock'
    ]);
  });
});
