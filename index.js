/*!
 * parse-gitignore <https://github.com/jonschlinkert/parse-gitignore>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const fs = require('fs');

const INVALID_PATH_CHARS_REGEX = /[<>:"|?*]/;
const MAX_PATH_LENGTH = 260;

const isValidPath = input => {
  if (typeof input === 'string') {
    return input.length <= MAX_PATH_LENGTH && !INVALID_PATH_CHARS_REGEX.test(input);
  }
  return false;
};

const split = str => String(str).split(/[\r\n]+/);
const isBlank = str => str.trim() === '';
const isComment = str => str.startsWith('#');
const gitignore = input => {
  if (isValidPath(input) && fs.existsSync(input)) return gitignore.file(input);
  return split(input).filter(line => !isBlank(line) && !isComment(line));
};

gitignore.parse = (input, options = {}) => {
  if (isValidPath(input) && fs.existsSync(input)) {
    return gitignore.parseFile(input);
  }

  const lines = split(input);
  let parsed = { patterns: [], sections: [] };
  let section = { name: 'default', patterns: [] };

  for (const line of lines) {
    if (line.charAt(0) === '#') {
      const [, hash, name] = /^(#+)(.*)$/.exec(line);
      section = { name: name.trim(), level: hash.length, patterns: [] };
      parsed.sections.push(section);
      continue;
    }

    if (line.trim() !== '') {
      section.patterns.push(line.trim());
      parsed.patterns.push(line.trim());
    }
  }

  if (options.dedupe !== false) {
    parsed = gitignore.dedupe(parsed, { ...options, stringify: false });
  }

  return parsed;
};

gitignore.file = filepath => gitignore(fs.readFileSync(filepath));

gitignore.parseFile = filepath => gitignore.parse(fs.readFileSync(filepath));

gitignore.dedupe = (parsed, options = {}) => {
  const seen = { patterns: new Set(), sections: new Map(), all: new Set() };
  const sections = [];

  if (typeof parsed === 'string') {
    parsed = gitignore.parse(parsed);
  }

  for (let i = 0; i < parsed.sections.length; i++) {
    let section = parsed.sections[i];

    if (options.onSection) {
      section = options.onSection(section);
      if (section !== false) sections.push(section);
      continue;
    }

    const existing = seen.sections.get(section.name);

    if (existing) {
      existing.patterns = [...new Set(existing.patterns.push(section.patterns))];
      section = existing;
    }

    const patterns = [];

    for (let pattern of section.patterns) {
      const exists = seen.patterns.has(pattern);
      seen.patterns.add(pattern);

      if (options.onPattern) {
        pattern = options.onPattern(pattern, section);
      }

      if (!exists && pattern !== false) {
        patterns.push(pattern);
      }
    }

    seen.sections.set(section.name, section);

    if (patterns.length > 0) {
      section.patterns = patterns;
      sections.push(section);
    }
  }

  parsed.sections = sections;

  if (options.stringify === false) {
    return parsed;
  }

  return gitignore.stringify(parsed);
};

/**
 * Formats a .gitignore section
 */

gitignore.format = section => {
  const heading = section.name ? `# ${section.name}` : '';
  return `${heading}\n${section.patterns.join('\n')}\n\n`;
};

/**
 * Stringify a .gitignore file from parsed sections.
 */

gitignore.stringify = (sections = [], fn = gitignore.format) => {
  if (sections.sections) sections = sections.sections;
  let result = '';

  for (const section of [].concat(sections)) result += fn(section);
  return result.trim();
};

/**
 * Re-format a .gitignore file
 * @param {String} input File path or contents.
 * @param {Object} options
 * @return {String} Returns re-formatted contents.
 * @api public
 */

gitignore.reformat = (input, options = {}) => {
  const parsed = gitignore.parse(input, options);
  const output = gitignore.stringify(parsed.sections, options);

  if (isValidPath(input) && options.write === true) {
    fs.writeFileSync(input, output);
  }

  return output;
};

/**
 * Expose `gitignore`
 */

module.exports = gitignore;
