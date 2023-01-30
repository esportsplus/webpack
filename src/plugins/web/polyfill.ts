import { default as NodePolyfillPlugin } from 'node-polyfill-webpack-plugin';
import { ProvidePlugin } from 'webpack';
import { Configuration } from '~/types';


const node = (webpack: Configuration) => {
    webpack.plugins.push(
        new NodePolyfillPlugin(),
        new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            process: 'process/browser'
        })
    );
};


export default { node };