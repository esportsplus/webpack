import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { default as CssMinimizerPlugin } from 'css-minimizer-webpack-plugin';
import { default as MiniCssExtractPlugin } from 'mini-css-extract-plugin';
import { WebpackConfiguration } from 'webpack-cli';
import autoprefixer from 'autoprefixer';
import sass from 'sass';


export default (config: WebpackConfiguration) => {
    config.module = config.module || {};
    config.module.rules = config.module?.rules || [];
    config.module.rules.push({
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
    });

    config.optimization = config.optimization || {};
    config.optimization.minimizer = config.optimization.minimizer || [];
    config.optimization.minimizer.push(
        new CssMinimizerPlugin()
    );

    config.plugins = config.plugins || [];
    config.plugins.push(
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: [`${config?.output?.path}/**/css/**/*.js`],
            cleanOnceBeforeBuildPatterns: [],
            dangerouslyAllowCleanPatternsOutsideProject: false,
            dry: false,
            verbose: false
        })
    );
};