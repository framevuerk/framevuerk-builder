const mergedirs = require('merge-dirs');
const path = require('path');

// copy folder/a into folder/b with conflict resolution 'overwrite'
mergedirs(path.resolve(__dirname, './node_modules'), path.resolve(__dirname, '../node_modules'), 'overwrite');