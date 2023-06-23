import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push({
        generator: {
            filename: 'fonts/[contenthash][ext]'
        },
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        type: 'asset/resource'
    });
};