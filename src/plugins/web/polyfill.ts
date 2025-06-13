import { default as NodePolyfillPlugin } from 'node-polyfill-webpack-plugin';
import webpack from 'webpack';
import { Configuration } from '~/types';


const node = (config: Configuration) => {
    config.plugins.push(
        new NodePolyfillPlugin(),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    );

    config.resolve.fallback ??= {};
    config.resolve.fallback.fs = false;
};


export default { node };