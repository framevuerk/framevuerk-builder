const path = require('path');
var fs = require('fs-extra');
console.log('cleaning...');
fs.moveSync(
  path.resolve(__dirname, './deps-dir/node_modules'),
  path.resolve(__dirname, './node_modules'),
  {
    overwrite: true
  },
);