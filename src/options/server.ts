import { WebpackConfiguration } from 'webpack-cli';


export default (config: WebpackConfiguration, server?: WebpackConfiguration['devServer'] | boolean) => {
    if (!server) {
        return;
    }

    if (typeof server === 'boolean') {
        server = {};
    }

    config.devServer = Object.assign({
        client: {
            overlay: false
        },
        compress: true,
        hot: true,
        open: true
    }, server);
};