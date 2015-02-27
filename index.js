/*!
 * parse-gitignore <https://github.com/jonschlinkert/parse-gitignore>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var unique = require('array-unique');
var filter = require('arr-filter');

module.exports = function gitignore(str) {
  if (!str) return null;

  var lines = str.split('\n');

  return unique(filter(lines, function (line) {
    line = line.trim();
    return line.charAt(0) !== '#' && line !== '';
  }));
};
