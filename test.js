/*!
 * parse-gitignore <https://github.com/jonschlinkert/parse-gitignore>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');
var should = require('should');
var gitignore = require('./');

function read(fp) {
  return fs.readFileSync('fixtures/' + fp, 'utf8');
}

describe('gitignore', function () {
  it('should parse a gitignore file and return an array:', function () {
    gitignore(read('a.txt')).should.containDeep(['temp', 'tmp', 'TODO.md', 'vendor']);
  });

  it('should not include code comments:', function () {
    gitignore(read('c.txt')).should.containDeep(['*.orig', '*.out', '*.pid', '*.rej', '*.seed', '*.swo', '*.sw']);
    gitignore(read('c.txt')).should.not.containDeep(['# OS or Editor folders']);
  });

  it('should uniquify the results when an array of patterns is passed:', function () {
    gitignore(read('d.txt'), ['d']).should.eql(['a', 'b', 'c', 'd']);
  });
});
