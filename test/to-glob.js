'use strict';

var fs = require('fs');
var assert = require('assert');
var should = require('should');
var toGlob = require('..').toGlob;

describe('to glob', function () {
  describe('object', function () {
    it('should return an object', function () {
      toGlob('a').should.have.property('patterns');
      toGlob('a').should.have.property('stats');
    });

    it('should return a stats object:', function () {
      toGlob('a').stats.should.have.properties(['first', 'last', 'isNegated']);
    });

    it('should return an array of glob patterns.', function () {
      assert.equal(toGlob('a').patterns.length, 2);
    });
  });

  describe('patterns', function () {
    it('should add a glob for non-globs', function () {
      toGlob('a').patterns.should.eql(['**/a', '**/a/**']);
    });

    it('should remove leading slashes', function () {
      toGlob('/a').patterns.should.eql(['a', 'a/**']);
    });

    it('should not modify starting or trailing stars', function () {
      toGlob('*/a').patterns.should.eql(['*/a']);
      toGlob('a/*').patterns.should.eql(['a/*']);
    });

    it('should add a slash and globstar to non-globs', function () {
      toGlob('.foo').patterns.should.eql(['**/.foo', '**/.foo/**']);
    });

    it('should add a trailing globstar when the last character is a slash.', function () {
      toGlob('.foo/').patterns.should.eql(['**/.foo/**']);
      toGlob('foo/').patterns.should.eql(['**/foo/**']);
      toGlob('a/*/').patterns.should.eql(['**/a/*/**']);
    });
  });
});
