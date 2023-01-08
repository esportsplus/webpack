const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = ({ entry, output, copy, production }) => {
    let plugins = [];

    output = path.resolve(output).replace(/\\/g, '/');
    production = production !== 'false' ? true : false;

    if (copy) {
        let patterns = [];

        if (typeof copy === 'object' && !Array.isArray(copy)) {
            throw new Error('`copy` must be an object');
        }

        for (let from in copy) {
            patterns.push({
                from: path.resolve(from).replace(/\\/g, '/'),
                to: path.resolve(copy[from]).replace(/\\/g, '/')
            });
        }

        plugins.push(
            new CopyPlugin({
                patterns,
                options: {
                    concurrency: 100
                }
            })
        );
    }

    return {
        entry,
        mode: (production ? 'production' : 'development'),
        output: {
            path: output,
        },
        plugins,
        watch: !production
    };
};