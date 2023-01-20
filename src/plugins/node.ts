import { default as NodePolyfillPlugin } from 'node-polyfill-webpack-plugin';
import { ProvidePlugin } from 'webpack';
import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.plugins.push(
        new NodePolyfillPlugin(),
        new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    );
};