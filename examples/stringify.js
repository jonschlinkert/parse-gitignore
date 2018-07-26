const parse = require('..');
const str = fs.readFileSync('.gitignore', 'utf8');
const res = parse(str);

console.log(res);
console.log(stringify(res.sections));
