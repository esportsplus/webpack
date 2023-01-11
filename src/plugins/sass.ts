import { default as CssMinimizerPlugin } from 'css-minimizer-webpack-plugin';
import { default as MiniCssExtractPlugin } from 'mini-css-extract-plugin';
import { default as RemoveEmptyScriptsPlugin } from 'webpack-remove-empty-scripts';
import { Configuration } from '~/types';
import autoprefixer from 'autoprefixer';
import glob from 'fast-glob';
import sass from 'sass';
import resolve from '~/resolve';


const entry = (pattern: string, { directory, hash }: { directory?: string, hash?: boolean } = {}) => {
    if (directory === undefined) {
        directory = `css`;
    }

    // DO NOT ADD EXTENSION TO FILENAME
    // - `mini-css-extract-plugin` plugin appends css extension once extracted
    // - JS files created during bundle are left extensionless
    // - Makes it easy to cleanup empty js files after build
    return {
        filename: `${directory ? `${directory}/` : ''}[${hash ? 'contenthash' : 'name'}]`,
        import: glob.sync( resolve(pattern) )
    };
};


export default (webpack: Configuration, use?: boolean) => {
    if (!use) {
        return;
    }

    webpack.module.rules.push({
        test: /\.(c|sc|sa)ss$/,
        use: [
            MiniCssExtractPlugin.loader,
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

    webpack.optimization.minimizer = webpack.optimization.minimizer || [];
    webpack.optimization.minimizer.push(
        new CssMinimizerPlugin()
    );

    webpack.plugins.push(
        new RemoveEmptyScriptsPlugin({
            remove: /^(.(?!.*\.css$))*$/g
        }),
        new MiniCssExtractPlugin({
            filename: (data: any) => {
                return `${data?.chunk?.filenameTemplate || `[contenthash]`}.css`;
            }
        })
    );
};
export { entry };