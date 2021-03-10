const fs = require('fs');
const path = require('path');
const parse = require('..');

(async() => {
  let parsed;

  try {
    parsed = await parse(fs.readFileSync(path.join(__dirname, '_gitignore')));
  } catch (exception) {
    // Handle exception
  }

  console.log(parsed);
})();
