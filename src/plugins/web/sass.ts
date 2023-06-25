import { default as MiniCssExtractPlugin } from 'mini-css-extract-plugin';
import { default as RemoveEmptyScriptsPlugin } from 'webpack-remove-empty-scripts';
import { Configuration } from '~/types';
import autoprefixer from 'autoprefixer';
import sass from 'sass';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            test: /\.(c|sa|sc)ss$/,
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

    config.plugins.push(
        new MiniCssExtractPlugin({
            filename: (data: any) => {
                return `${data?.chunk?.filenameTemplate || data?.chunk?.name || '[contenthash]'}.css`;
            }
        }),
        new RemoveEmptyScriptsPlugin({
            remove: /css\/([^.]*|(.+)\.js)$/
        })
    );
};