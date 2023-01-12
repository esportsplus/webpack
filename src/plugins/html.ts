import { default as HtmlWebpackPlugin } from 'html-webpack-plugin';
import { Configuration } from '~/types';


export default (webpack: Configuration, options?: HtmlWebpackPlugin.Options) => {
    if (!options) {
        return;
    }

    options.meta = options.meta || {};
    options.meta.content = options.meta.content || 'text/html';
    options.meta.favicon = options.meta.favicon || 'storage/images/favicon.ico';
    options.meta.viewport = options.meta.viewport || 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimal-ui';

    webpack.plugins.push(
        new HtmlWebpackPlugin(options)
    );
};