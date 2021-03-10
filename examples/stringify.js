const fs = require('fs');
const parse = require('..');
const { stringify } = parse;
const str = fs.readFileSync('.gitignore', 'utf8');

parse(str).then((res) => {
  console.log(res);
  console.log(stringify(res.sections));
}).catch((error) => {
  console.error(error);
});
