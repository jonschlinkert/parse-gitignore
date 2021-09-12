'use strict';

const gitignore = require('..');

const contents = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock
`;

const { patterns, sections } = gitignore(contents);

console.log(patterns);
// [ 'logs',
//   '*.log',
//   'npm-debug.log*',
//   'yarn-debug.log*',
//   'yarn-error.log*',
//   'pids',
//   '*.pid',
//   '*.seed',
//   '*.pid.lock' ]

console.log(sections);
// [
//   {
//     name: 'Logs',
//     value: '# Logs',
//     patterns: [
//       'logs',
//       '*.log',
//       'npm-debug.log*',
//       'yarn-debug.log*',
//       'yarn-error.log*'
//     ]
//   },
//   {
//     name: 'Runtime data',
//     value: '# Runtime data',
//     patterns: [ 'pids', '*.pid', '*.seed', '*.pid.lock' ]
//   }
// ]
