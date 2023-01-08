const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');


module.exports = (entry, output, { copy, production } = {}) => {
    let plugins = [];

    output = path.resolve(output).replace(/\\/g, '/');
    production = production !== 'false' ? true : false;

    if (copy) {
        for (let obj of copy) {
            obj.from = path.resolve(obj.from).replace(/\\/g, '/');
            obj.to = path.resolve(obj.to).replace(/\\/g, '/');
        }

        plugins.push(
            new CopyPlugin({
                patterns: copy,
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