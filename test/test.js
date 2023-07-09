'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { dedupe, parse } = require('..');

const fixture = name => fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf8');

describe('gitignore', () => {
  it('should parse a gitignore file and return an array', () => {
    assert.deepEqual(parse(fixture('_gitignore')).patterns, [
      'logs',
      '*.log',
      'npm-debug.log',
      'yarn-debug.log',
      'yarn-error.log',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock'
    ]);
  });

  it('should de-dupe patterns', () => {
    assert.deepEqual(parse(fixture('_gitignore_dupes'), { unique: true }).patterns, [
      'logs',
      '*.log',
      'npm-debug.log',
      'yarn-debug.log',
      'yarn-error.log',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock'
    ]);
  });

  it('should de-dupe sections', () => {
    const parsed = parse(fixture('_gitignore_dupes_sections'));
    assert.deepEqual(parsed.sections, JSON.parse(fixture('_gitignore_dupes_sections.json')));
    assert.deepEqual(dedupe(parsed).sections, JSON.parse(fixture('_gitignore_deduped_sections.json')));
  });

  it('should preserve multi-line comments', () => {
    const name = '_gitignore_multiline_comments';
    assert.equal(parse.format(fixture(name)), fixture(name));
  });

  it('should not try to load ignored files as an ignorefile', () => {
    // if our ignore only includes a relative file that happens to be valid (e.g. package.json)
    const content = 'package.json';
    // it should not path check (otherwise would fail)
    const parsed = parse(content, { disablePathCheck: true });
    assert.equal(parsed.patterns, content);
  });
});
