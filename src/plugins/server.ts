import { WebpackConfiguration } from 'webpack-cli';
import { Configuration } from '~/types';


export default (webpack: Configuration, server?: WebpackConfiguration['devServer'] | boolean) => {
    if (!server) {
        return;
    }

    webpack.devServer = Object.assign({
        client: {
            overlay: false
        },
        compress: true,
        hot: true,
        open: true
    }, (typeof server === 'boolean') ? {} : server);
};