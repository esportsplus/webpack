import { Configuration } from '~/types';


export default (config: Configuration, server?: Configuration['devServer']) => {
    if (config.mode === 'production') {
        return;
    }

    config.devServer = Object.assign(
        {
            client: {
                overlay: false,
                progress: true
            },
            compress: true,
            historyApiFallback: true,
            hot: true,
            open: true,
            server: 'https'
        },
        config.devServer || {},
        server || {}
    );
};