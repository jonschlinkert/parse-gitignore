'use strict';

var gitignore = require('./');
var mm = require('micromatch');
var glob = require('glob-fs')({ builtins: false });


var patterns = gitignore('.gitignore');
var files = [];

glob.readdirStream('**/*')
  .on('data', function (file) {
    if (!mm.any(file.path, patterns)) {
      files.push(file.path);
    }
  })
  .on('end', function () {
    console.log(files);
  });
