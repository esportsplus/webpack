import { Configuration, WebpackConfiguration } from '~/types';


export default (webpack: Configuration, server?: WebpackConfiguration['devServer']) => {
    webpack.devServer = Object.assign({
        client: {
            overlay: false
        },
        compress: true,
        hot: true,
        open: true
    }, server || {});
};