/*!
 * parse-gitignore <https://github.com/jonschlinkert/parse-gitignore>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var gitignore = require('../');

describe('gitignore', function () {
  it('should parse a gitignore file and return an array:', function () {
    gitignore('test/fixtures/a.txt').should.containDeep([
     'temp',
      'tmp',
     'TODO.md',
     'vendor'
    ]);
  });

  it('should not include code comments:', function () {
    gitignore('test/fixtures/c.txt').should.containDeep([
     '*.orig',
     '*.out',
     '*.pid',
     '*.rej',
     '*.seed',
     '*.swo',
     '*.sw'
    ]);
    gitignore('test/fixtures/c.txt').should.not.containDeep(['# OS or Editor folders']);
  });

  it('should uniquify the results when an array of patterns is passed:', function () {
    gitignore('test/fixtures/d.txt', ['d']).should.eql([
     'a',
     'a/**',
     'b',
     'b/**',
     'c',
     'c/**',
     'd',
     'd/**'
    ]);
  });
});
