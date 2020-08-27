const path = require('path');
const fs = require('fs');
// default mkdir only does one level at a time, this helps with sub levels 
const mkdirp = require('mkdirp');

const withDefaults = require('./utils/default-options')

exports.onPreBootstrap = ({ store }, options) => {
    const { program } = store.getState();
    const{ contentPath } = withDefaults(options)
    // creates directory of location on fs where content should exist
    const dir = path.join(program.directory, contentPath)

    if (!fs.existsSync(dir)) {
        // create dir
        mkdirp.sync(dir);
    }
}