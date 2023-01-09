const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const glob = require('glob');
const path = require('path');


const config = ({ entry, output, copy, production }) => {
    let config = require('./webpack.config.js')({ entry, output, copy, production });

    return Object.assign(config, {
        devtool: 'cheap-source-map',
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
            removeEmptyChunks: false,
            splitChunks: false,
            usedExports: config.mode === 'production'
        },
        plugins: [
            ...config.plugins,
            new ForkTsCheckerWebpackPlugin()
        ],
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            fullySpecified: false,
            plugins: [
                new TsconfigPathsPlugin({
                    extensions: ['.js', '.ts', '.tsx']
                })
            ],
            symlinks: false
        }
    });
};

const entry = (pattern) => {
    return glob.sync(path.resolve(pattern).replace(/\\/g, '/'), { nosort: true });
};


module.exports = { config, entry };