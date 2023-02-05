import { default as HtmlWebpackPlugin } from 'html-webpack-plugin';
import { Configuration } from '~/types';


export default (webpack: Configuration, options: HtmlWebpackPlugin.Options) => {
    options.chunksSortMode ??= 'manual';

    options.meta ??= {};
    options.meta.content ??= 'text/html';
    options.meta.viewport ??= 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimal-ui';

    webpack.plugins.push(
        new HtmlWebpackPlugin(options)
    );
};