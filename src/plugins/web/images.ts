import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push({
        generator: {
            filename: 'images/[contenthash][ext]'
        },
        test: /.(gif|jpe?g|png|webp)$/,
        type: 'asset/resource'
    });
};