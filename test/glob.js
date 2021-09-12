'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { globs } = require('..');

const readFile = name => fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8');

describe('globs', () => {
  it('should convert a gitignore to glob patterns', () => {
    const patterns = readFile('_gitignore_globs');
    const expected = [
      '*.log',
      '*.pid.lock',
      '*.pid',
      '*.seed',
      '**/*.log/**',
      '**/*.pid.lock/**',
      '**/*.pid/**',
      '**/*.seed/**',
      '**/b/**',
      '**/b/**/',
      '**/logs/**',
      '**/npm-debug.log/**',
      '**/pids/**/',
      '**/yarn-debug.log/**',
      '**/yarn-error.log/**',
      '*.foo',
      '*.foo/**',
      'a/b',
      'a/b/',
      'a/b/**',
      'a/b/**/',
      'a/b/c',
      'a/b/c/',
      'a/b/c/**',
      'a/b/c/**/',
      'abc/**/xyz',
      'b',
      'b/',
      'logs',
      'npm-debug.log',
      'other/',
      'other/**/',
      'pids/',
      'yarn-debug.log',
      'yarn-error.log'
    ];

    assert.deepEqual(globs(patterns)[0].patterns.sort(), expected.sort());
  });
});
