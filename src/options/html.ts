import { default as HtmlWebpackPlugin } from 'html-webpack-plugin';
import { WebpackConfiguration } from 'webpack-cli';


export default (config: WebpackConfiguration, options?: HtmlWebpackPlugin.Options) => {
    if (!options) {
        return;
    }

    options.meta = options.meta || {};
    options.meta.content = options.meta.content || 'text/html; charset=utf-8;';
    options.meta.favicon = options.meta.favicon || 'storage/images/favicon.ico';
    options.meta.viewport = options.meta.viewport || 'width=device-width, height=device-height, initial-scale=1, maximum-scale=1, minimal-ui';

    config.plugins = config.plugins || [];
    config.plugins.push(
        new HtmlWebpackPlugin(options)
    );
};