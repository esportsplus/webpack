const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');


const config = (entry, output, { copy, production } = {}) => {
    let config = require('./webpack.config.js')(entry, output, { copy, production });

    return Object.assign(config, {
        module: {
            rules: [
                {
                    generator: {
                        dataUrl: (content) => {
                            return content.toString();
                        }
                    },
                    test: /\.(svg)$/i,
                    type: 'asset/inline',
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                    resolve: {
                        fullySpecified: false,
                    }
                },
                {
                    test: /\.txt$/i,
                    use: 'raw-loader',
                }
            ]
        },
        optimization: {
            mangleWasmImports: config.mode === 'production',
            minimize: config.mode === 'production',
            usedExports: config.mode === 'production'
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            fullySpecified: false,
            plugins: [
                new TsconfigPathsPlugin({
                    extensions: ['.js', '.ts', '.tsx']
                })
            ]
        }
    });
};

const entry = (pattern) => {
    return glob.sync(path.resolve(pattern).replace(/\\/g, '/'), { nosort: true });
};


module.exports = { config, entry };