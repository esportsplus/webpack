import { default as CssMinimizerPlugin } from 'css-minimizer-webpack-plugin';
import { default as MiniCssExtractPlugin } from 'mini-css-extract-plugin';
import { default as RemoveEmptyScriptsPlugin } from 'webpack-remove-empty-scripts';
import { Configuration } from '~/types';
import autoprefixer from 'autoprefixer';
import sass from 'sass';
import resolve from '~/resolve';


// DO NOT ADD EXTENSION TO FILENAME
// - All files will receive the extension ( including bundled js files )
// - `mini-css-extract-plugin` plugin appends css extension once extracted
// - JS files created during bundle are left extensionless
// - Makes it easy to cleanup empty js files after build
const entry = (pattern: string, { directory, hash }: { directory?: string, hash?: boolean } = {}) => {
    return {
        filename: `${directory ? `${directory}/` : ''}[${hash ? 'contenthash' : 'name'}]`,
        import: resolve.glob(pattern)
    };
};


export default (webpack: Configuration) => {
    webpack.module.rules.push(
        {
            test: /\.(c|sc|sa)ss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
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
        }
    );

    webpack.optimization.minimizer = webpack.optimization.minimizer || [];
    webpack.optimization.minimizer.push(
        new CssMinimizerPlugin()
    );
    webpack.optimization.removeEmptyChunks = true;

    webpack.plugins.push(
        new RemoveEmptyScriptsPlugin({
            remove: /css\/([^.]*|(.+)\.js)$/
        }),
        new MiniCssExtractPlugin({
            filename: (data: any) => {
                return `${data?.chunk?.filenameTemplate || data?.chunk?.name || '[contenthash]'}.css`;
            }
        })
    );
};
export { entry };