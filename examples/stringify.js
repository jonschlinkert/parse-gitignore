const fs = require('fs');
const parse = require('..');
const { stringify } = parse;
const str = fs.readFileSync('.gitignore', 'utf8');

parse(str).then(async (res) => {
  console.log(res);
  console.log(await stringify(res.sections));
}).catch((error) => {
  console.error(error);
});
