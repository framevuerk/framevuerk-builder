const path = require('path');
var fs = require('fs-extra');

fs.moveSync(
  path.resolve(__dirname, './node_modules'),
  path.resolve(__dirname, '../node_modules'),
  {
    overwrite: true
  },
);