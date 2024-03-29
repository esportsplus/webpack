import { default as HtmlWebpackPlugin } from 'html-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration, options: HtmlWebpackPlugin.Options = {}) => {
    options.chunksSortMode ??= 'manual';

    options.meta = options.meta || {};
    options.meta.content ??= 'text/html';
    options.meta.viewport ??= 'height=device-height, initial-scale=1, maximum-scale=1, minimal-ui, width=device-width';

    config.plugins.push(
        new HtmlWebpackPlugin(options)
    );
};