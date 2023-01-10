import { WebpackConfiguration } from 'webpack-cli';
import { Configuration } from '~/types';


export default (config: Configuration, server?: WebpackConfiguration['devServer'] | boolean) => {
    if (!server) {
        return;
    }

    config.devServer = Object.assign({
        client: {
            overlay: false
        },
        compress: true,
        hot: true,
        open: true
    }, (typeof server === 'boolean') ? {} : server);
};