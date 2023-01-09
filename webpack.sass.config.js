const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const path = require('path');
const sass = require('sass');


const config = ({ entry, output, copy, production }) => {
    let config = require('./webpack.config.js')({ entry, output, copy, production });

    return Object.assign(config, {
        module: {
            rules: [
                {
                    test: /\.(c|sc|sa)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                // Prevents Following Urls To Fonts/Images
                                url: false,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer()
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // Use `dart-sass`
                                implementation: sass,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            minimize: config.mode === 'production',
            minimizer: [
                `...`,
                new CssMinimizerPlugin()
            ],
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new CleanWebpackPlugin({
                cleanAfterEveryBuildPatterns: [`${output}/**/*.js`],
                cleanOnceBeforeBuildPatterns: [],
                dangerouslyAllowCleanPatternsOutsideProject: false,
                dry: false,
                verbose: false
            }),
            ...config.plugins
        ],
        resolve: {
            symlinks: false
        }
    });
};

const entry = (pattern, { normalizer, ui } = {}) => {
    let scss = glob.sync(path.resolve(pattern).replace(/\\/g, '/'), { nosort: true });

    if (ui !== undefined) {
        if (typeof ui !== 'string') {
            throw new Error('`ui` must be a string');
        }

        scss.push(`@esportsplus/ui/build/css/css-utilities${ui ? `.${ui}` : ''}.css`);
        scss.unshift(`@esportsplus/ui/build/css/components${ui ? `.${ui}` : ''}.css`);
    }

    if (normalizer) {
        scss.unshift('modern-normalize/modern-normalize.css');
    }

    return scss.flat();
};


module.exports = { config, entry };